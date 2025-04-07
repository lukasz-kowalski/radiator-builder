"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

import { Radiator } from "@/api/dto/radiator";
import { buildSearchParams } from "@/lib/buildSearchParams";
import { Inputs } from "@/features/builder/types/inputs";

interface Output {
  radiators: Radiator[];
  totalItems: number;
  isFetching: boolean;
  hasSearched: boolean;
  setFilters: (data: Inputs) => void;
  loadMoreItems: () => void;
}

export default function useRadiatorsState(): Output {
  const [radiators, setRadiators] = useState<Radiator[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [filter, setFilter] = useState<URLSearchParams>(new URLSearchParams());
  const [isFetching, setIsFetching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const pageRef = useRef(1);

  const fetchRadiators = async (filter: URLSearchParams) => {
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
      setHasSearched(true);
    }
  };

  useEffect(() => {
    if (!filter.toString()) return;

    fetchRadiators(filter);
  }, [filter]);

  const setFilters: SubmitHandler<Inputs> = useCallback(async (data) => {
    pageRef.current = 1;
    setRadiators([]);
    setTotalItems(0);

    const params = buildSearchParams({ ...data, page: "1" });
    setFilter(params);
  }, []);

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

  return {
    radiators,
    totalItems,
    isFetching,
    hasSearched,
    setFilters,
    loadMoreItems,
  };
}
