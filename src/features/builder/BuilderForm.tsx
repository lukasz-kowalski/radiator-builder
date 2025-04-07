"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useRef, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import { Input, Select } from "@/components/form";
import { Card } from "@/components/layout";
import { Button } from "@/components/general";
import { RadiatorFamily, Radiator } from "@/api/dto/radiator";
import RadiatorCard from "@/components/radiator/RadiatorCard";
import { buildSearchParams } from "@/lib/buildSearchParams";
import { builderSchema } from "@/features/builder/BuilderForm.schema";

interface Props {
  families: RadiatorFamily[];
}

export type Inputs = {
  radiatorFamily?: string;
  radiatorLengthFrom?: number;
  radiatorLengthTo?: number;
};

export default function BuilderForm({ families }: Props): React.JSX.Element {
  const [radiators, setRadiators] = useState<Radiator[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [filter, setFilter] = useState<URLSearchParams>(new URLSearchParams());
  const [isFetching, setIsFetching] = useState(false);

  const pageRef = useRef(1);

  useEffect(() => {
    if (!filter.toString()) return;

    const fetchRadiators = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(
          "/api/getRadiators?".concat(filter.toString())
        );
        const res = await response.json();

        setRadiators(res.data);
        setTotalItems(res.totalItems);
        pageRef.current = 2;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchRadiators();
  }, [filter]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      radiatorFamily: "",
      radiatorLengthFrom: 0,
    },
    mode: "onBlur",
    resolver: zodResolver(builderSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    pageRef.current = 1;
    setRadiators([]);
    setTotalItems(0);

    const params = buildSearchParams({ ...data, page: "1" });
    setFilter(params);
  };

  const isItemLoaded = (index: number) => index < radiators.length;

  const loadMoreItems = useCallback(async () => {
    if (isFetching) return;

    try {
      filter.set("page", pageRef.current.toString());
      setIsFetching(true);
      const response = await fetch(
        "/api/getRadiators?".concat(filter.toString())
      );

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      if (data.data.length > 0) {
        setRadiators((prev) => [...prev, ...data.data]);
        setTotalItems(data.totalItems);
        pageRef.current = data.currentPage + 1;
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setIsFetching(false);
    }
  }, [filter, isFetching]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-4">
          <Select
            {...register("radiatorFamily")}
            defaultValue=""
            label="Radiator family"
            error={errors.radiatorFamily?.message}
            options={families.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />

          <Input
            label="Radiator length from (mm)"
            error={errors.radiatorLengthFrom?.message}
            {...register("radiatorLengthFrom")}
            id="radiatorLengthFrom"
            type="number"
          />
          <Input
            label="Radiator length to (mm)"
            error={errors.radiatorLengthTo?.message}
            {...register("radiatorLengthTo")}
            id="radiatorLengthTo"
            type="number"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={() => reset()}>Clear</Button>
          <Button type="submit" variant="confirm">
            Search
          </Button>
        </div>
      </form>

      {radiators.length > 0 && (
        <div className="h-[600px] w-full mt-6">
          <AutoSizer>
            {({ height, width }) => {
              const columnCount = 3;
              const rowHeight = 260;
              const columnPadding = 8;
              const columnWidth = width / columnCount - columnPadding;
              const rowCount = Math.ceil(totalItems / columnCount);

              return (
                <InfiniteLoader
                  isItemLoaded={isItemLoaded}
                  itemCount={totalItems}
                  loadMoreItems={loadMoreItems}
                >
                  {({ onItemsRendered, ref }) => (
                    <Grid
                      ref={ref}
                      height={height}
                      width={width}
                      columnCount={columnCount}
                      columnWidth={columnWidth}
                      rowCount={rowCount}
                      rowHeight={rowHeight}
                      onItemsRendered={({
                        visibleRowStartIndex,
                        visibleRowStopIndex,
                        visibleColumnStartIndex,
                        visibleColumnStopIndex,
                      }) => {
                        const startIndex =
                          visibleRowStartIndex * columnCount +
                          visibleColumnStartIndex;
                        const stopIndex =
                          visibleRowStopIndex * columnCount +
                          visibleColumnStopIndex;
                        onItemsRendered({
                          overscanStartIndex: startIndex,
                          overscanStopIndex: stopIndex,
                          visibleStartIndex: startIndex,
                          visibleStopIndex: stopIndex,
                        });
                      }}
                    >
                      {({ rowIndex, columnIndex, style }) => {
                        const index = rowIndex * columnCount + columnIndex;
                        const radiator = radiators[index];
                        if (!radiator) return null;

                        return (
                          <div
                            style={style}
                            key={`cell-${rowIndex}-${columnIndex}`}
                            className="p-2"
                          >
                            <RadiatorCard radiator={radiator} />
                          </div>
                        );
                      }}
                    </Grid>
                  )}
                </InfiniteLoader>
              );
            }}
          </AutoSizer>
        </div>
      )}

      {/* {radiators.length > 0 && (
        <div className="h-96 w-full">
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={totalItems}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={radiators.length}
                    itemSize={248}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {({ index, style }) => (
                      <div
                        style={style}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                      >
                        {radiators.map((radiator) => (
                          <RadiatorCard
                            key={radiator.length_id}
                            radiator={radiator}
                          />
                        ))}
                      </div>
                    )}
                  </List>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </div>
      )} */}
    </Card>
  );
}
