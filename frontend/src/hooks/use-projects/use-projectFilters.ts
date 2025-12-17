import { useEffect, useMemo } from "react";
import type { TableProps } from "antd";
import type { ProjectRecord } from "@/types";
import { type RangeFilter, type StatusFilter } from "@utils";
import { useSearchParamsUtility } from "@hooks";

export const useProjectFilters = () => {
  const { 
    getFilterParam, 
    setFilterParams, 
    resetFilterParams, 
    initializeParams,
  } = useSearchParamsUtility();
  
  // Get filter values from URL
  const searchTerm = getFilterParam("search", "");
  const statusFilter = getFilterParam("status", "all") as StatusFilter;
  const rangeFilter = getFilterParam("range", "quarter") as RangeFilter;
  const currentPage = parseInt(getFilterParam("page", "1"), 10);
  const pageSize = parseInt(getFilterParam("pageSize", "5"), 10);

  // Initialize URL params on mount (skip search - only initialize if not present)
  useEffect(() => {
    initializeParams({
      status: "all",
      range: "quarter",
      page: "1",
      pageSize: "5",
    });
  }, [initializeParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setFilterParams("page", "1");
    }
  }, [searchTerm, statusFilter, rangeFilter]);

  // Build pagination config
  const pagination = useMemo(() => ({
    current: currentPage,
    pageSize: pageSize,
  }), [currentPage, pageSize]);

  // Handle table pagination changes
  const handleTableChange: TableProps<ProjectRecord>["onChange"] = (
    nextPagination
  ) => {
    if (!nextPagination) return;

    const newPage = nextPagination.current ?? currentPage;
    const newPageSize = nextPagination.pageSize ?? pageSize;

    if (newPageSize !== pageSize) {
      setFilterParams("pageSize", String(newPageSize));
      setFilterParams("page", "1");
    } else if (newPage !== currentPage) {
      setFilterParams("page", String(newPage));
    }
  };

  // Reset all filters
  const resetFilters = () => {
    resetFilterParams();
    initializeParams({
      page: "1",
      pageSize: "5",
    });
  };

  return {
    searchTerm,
    statusFilter,
    rangeFilter,
    pagination,
    handleTableChange,
    resetFilters,
    setFilterParams,
  };
};
