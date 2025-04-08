import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import { Radiator } from "@/api/dto/radiator";
import RadiatorCard from "@/features/builder/RadiatorCard";
import Spinner from "@/components/general/Spinner";

interface Props {
  isFetching: boolean;
  radiators: Radiator[];
  totalItems: number;
  hasSearched: boolean;
  loadMoreItems: () => void;
}

export default function RadiatorList({
  isFetching,
  radiators,
  totalItems,
  hasSearched,
  loadMoreItems,
}: Props) {
  const isItemLoaded = (index: number) => index < radiators.length;

  if (isFetching && radiators.length === 0) {
    return <Spinner />;
  }

  if (hasSearched && !isFetching && radiators.length === 0) {
    return <p>Could not find any radiator. Change filters and try again.</p>;
  }

  return (
    <>
      {radiators.length > 0 && (
        <div className="h-[600px] w-full mt-6">
          <AutoSizer>
            {({ height, width }) => {
              const columnCount = width < 460 ? 1 : width < 640 ? 2 : 3;
              const rowHeight = width < 460 ? 230 : 260;
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

                        return (
                          <div
                            style={style}
                            key={`cell-${rowIndex}-${columnIndex}`}
                            className="p-2"
                          >
                            {radiator ? (
                              <RadiatorCard radiator={radiator} />
                            ) : isFetching ? (
                              <Spinner />
                            ) : null}
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
    </>
  );
}
