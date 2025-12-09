import { Search, Dropdown } from "@components/ui";
import {
  RANGE_OPTIONS,
  STATUS_OPTIONS,
  type RangeFilter,
  type StatusFilter,
} from "@utils";
import { useProjectFilters } from "@hooks";
import { useProjectsContext } from "../context";

type ProjectFiltersProps = {
  className?: string;
};

export const ProjectFilters = ({
  className,
}: ProjectFiltersProps = {}) => {
  const {
    searchTerm,
    statusFilter,
    rangeFilter,
    handleSearchChange,
    handleStatusChange,
    handleRangeChange,
  } = useProjectsContext();

  return (
    <div
      className={`flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between ${
        className ?? ""
      }`}
    >
      <Search
        placeholder="Search projects"
        allowClear
        value={searchTerm}
        onChange={(event) => handleSearchChange(event.target.value)}
        onSearch={handleSearchChange}
        className="w-full md:max-w-sm"
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <Dropdown
          value={statusFilter}
          options={STATUS_OPTIONS.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
          onChange={(value) => handleStatusChange(value as StatusFilter)}
          className="w-full md:w-48"
        />
        <Dropdown
          value={rangeFilter}
          options={RANGE_OPTIONS.map((opt) => ({
            label: opt.label,
            value: opt.value,
          }))}
          onChange={(value) => handleRangeChange(value as RangeFilter)}
          className="w-full md:w-48"
        />
      </div>
    </div>
  );
};
