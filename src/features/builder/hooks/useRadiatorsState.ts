"use client";

import { useState, useCallback, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { Radiator } from "@/api/dto/radiator";
import { buildSearchParams } from "@/lib/buildSearchParams";
import { Inputs } from "@/features/builder/types/inputs";
import { getRadiators } from "@/api/getRadiators";

interface Output {
  radiators: Radiator[];
  totalItems: number;
  isFetching: boolean;
  hasSearched: boolean;
  setFilters: (data: Inputs) => void;
  loadMoreItems: () => void;
}

export default function useRadiatorsState(): Output {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<URLSearchParams>(new URLSearchParams());
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery({
      queryKey: ["loadMoreRadiators", filter],
      queryFn: ({ pageParam = 1 }) => {
        if (pageParam === 1) {
          setHasSearched(true);
        }

        filter.set("page", String(pageParam));
        return getRadiators(filter);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined;
      },
      enabled: filter.toString().length > 0,
    });

  useEffect(() => {
    if (filter.toString().length > 0) {
      refetch();
    }
  }, [filter]);

  const loadMoreItems = useCallback(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage]);

  const setFilters: SubmitHandler<Inputs> = useCallback(async (data) => {
    queryClient.setQueryData(["loadMoreRadiators", filter], {
      pages: [],
      data: [],
    });

    const params = buildSearchParams({ ...data, page: "1" });
    setFilter(params);
  }, []);

  return {
    radiators: data?.pages.flatMap((page) => page.data) || [],
    totalItems: data?.pages[0]?.totalItems || 0,
    isFetching,
    hasSearched,
    setFilters,
    loadMoreItems,
  };
}
