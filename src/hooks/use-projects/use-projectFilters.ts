import { useState, useCallback } from "react";
import type { TablePaginationConfig, TableProps } from "antd";
import type { ProjectRecord } from "@/types";
import { type RangeFilter, type StatusFilter } from "@utils";

type UseProjectFiltersOptions = {
  initialSearch?: string;
  initialStatus?: StatusFilter;
  initialRange?: RangeFilter;
  initialPagination?: TablePaginationConfig;
};

export const useProjectFilters = ({
  initialSearch = "",
  initialStatus = "all",
  initialRange = "quarter",
  initialPagination = {
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ["5", "10", "15", "20"],
  },
}: UseProjectFiltersOptions = {}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatus);
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(initialRange);
  const [pagination, setPagination] =
    useState<TablePaginationConfig>(initialPagination);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleStatusChange = useCallback((value: StatusFilter) => {
    setStatusFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleRangeChange = useCallback((value: RangeFilter) => {
    setRangeFilter(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, []);

  const handleTableChange = useCallback(
    (nextPagination: TablePaginationConfig | undefined) => {
      if (nextPagination) {
        setPagination((prev) => ({
          ...prev,
          current: nextPagination.current ?? prev.current,
          pageSize: nextPagination.pageSize ?? prev.pageSize,
        }));
      }
    },
    []
  ) as TableProps<ProjectRecord>["onChange"];

  const resetFilters = useCallback(() => {
    setSearchTerm(initialSearch);
    setStatusFilter(initialStatus);
    setRangeFilter(initialRange);
    setPagination(initialPagination);
  }, [initialSearch, initialStatus, initialRange, initialPagination]);

  return {
    searchTerm,
    statusFilter,
    rangeFilter,
    pagination,
    handleSearchChange,
    handleStatusChange,
    handleRangeChange,
    handleTableChange,
    resetFilters,
    setPagination,
  };
};
