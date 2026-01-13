import { useEffect, useMemo } from "react";
import type { ResourceTypeFilter, ResourceStatusFilter } from "@/types/resource";
import { useSearchParamsUtility } from "@hooks";

export const useResourceFilters = () => {
  const { 
    getFilterParam, 
    setFilterParams, 
    resetFilterParams, 
    initializeParams,
  } = useSearchParamsUtility();
  
  // Get filter values from URL
  const searchTerm = getFilterParam("search", "");
  const typeFilter = getFilterParam("type", "all") as ResourceTypeFilter;
  const statusFilter = getFilterParam("status", "all") as ResourceStatusFilter;
  const categoryFilter = getFilterParam("category", "");
  const tagFilter = getFilterParam("tag", "");
  const currentPage = parseInt(getFilterParam("page", "1"), 10);
  const pageSize = parseInt(getFilterParam("pageSize", "12"), 10);

  // Initialize URL params on mount
  useEffect(() => {
    initializeParams({
      type: "all",
      status: "all",
      page: "1",
      pageSize: "12",
    });
  }, [initializeParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setFilterParams("page", "1");
    }
  }, [searchTerm, typeFilter, statusFilter, categoryFilter, tagFilter, setFilterParams, currentPage]);

  // Build pagination config
  const pagination = useMemo(() => ({
    current: currentPage,
    pageSize: pageSize,
  }), [currentPage, pageSize]);

  return {
    searchTerm,
    typeFilter,
    statusFilter,
    categoryFilter,
    tagFilter,
    pagination,
    setFilterParams,
    resetFilterParams,
  };
};

