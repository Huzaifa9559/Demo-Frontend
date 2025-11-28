import { createContext, useContext, type ReactNode } from "react";
import { Search, Dropdown } from "@components/ui";
import {
  RANGE_OPTIONS,
  STATUS_OPTIONS,
  type RangeFilter,
  type StatusFilter,
} from "@utils";
import { useProjectsContext } from "../context/ProjectsContext";

type ProjectFiltersContextValue = {
  searchValue: string;
  statusValue: StatusFilter;
  rangeValue: RangeFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onRangeChange: (value: RangeFilter) => void;
};

const ProjectFiltersContext = createContext<
  ProjectFiltersContextValue | undefined
>(undefined);

const useProjectFiltersContext = () => {
  const context = useContext(ProjectFiltersContext);
  if (!context) {
    throw new Error(
      "ProjectFilters sub-components must be used within ProjectFilters"
    );
  }
  return context;
};

type ProjectFiltersProps = {
  className?: string;
  children: ReactNode;
};

const ProjectFiltersRoot = ({ className, children }: ProjectFiltersProps) => {
  const {
    searchValue,
    statusValue,
    rangeValue,
    onSearchChange,
    onStatusChange,
    onRangeChange,
  } = useProjectsContext();

  const contextValue: ProjectFiltersContextValue = {
    searchValue,
    statusValue,
    rangeValue,
    onSearchChange,
    onStatusChange,
    onRangeChange,
  };

  return (
    <ProjectFiltersContext.Provider value={contextValue}>
      <div
        className={`flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between ${
          className ?? ""
        }`}
      >
        {children}
      </div>
    </ProjectFiltersContext.Provider>
  );
};

type ProjectFiltersSearchProps = {
  className?: string;
  placeholder?: string;
};

const ProjectFiltersSearch = ({
  className = "w-full md:max-w-sm",
  placeholder = "Search projects",
}: ProjectFiltersSearchProps) => {
  const { searchValue, onSearchChange } = useProjectFiltersContext();

  return (
    <Search
      placeholder={placeholder}
      allowClear
      value={searchValue}
      onChange={(event) => onSearchChange(event.target.value)}
      onSearch={onSearchChange}
      className={className}
    />
  );
};

type ProjectFiltersStatusProps = {
  className?: string;
};

const ProjectFiltersStatus = ({
  className = "w-full md:w-48",
}: ProjectFiltersStatusProps) => {
  const { statusValue, onStatusChange } = useProjectFiltersContext();

  return (
    <Dropdown
      value={statusValue}
      options={STATUS_OPTIONS.map((opt) => ({
        label: opt.label,
        value: opt.value,
      }))}
      onChange={(value) => onStatusChange(value as StatusFilter)}
      className={className}
    />
  );
};

type ProjectFiltersRangeProps = {
  className?: string;
};

const ProjectFiltersRange = ({
  className = "w-full md:w-48",
}: ProjectFiltersRangeProps) => {
  const { rangeValue, onRangeChange } = useProjectFiltersContext();

  return (
    <Dropdown
      value={rangeValue}
      options={RANGE_OPTIONS.map((opt) => ({
        label: opt.label,
        value: opt.value,
      }))}
      onChange={(value) => onRangeChange(value as RangeFilter)}
      className={className}
    />
  );
};

type ProjectFiltersGroupProps = {
  className?: string;
  children: ReactNode;
};

const ProjectFiltersGroup = ({
  className = "flex flex-col gap-3 md:flex-row",
  children,
}: ProjectFiltersGroupProps) => {
  return <div className={className}>{children}</div>;
};

// Compound component
export const ProjectFilters = Object.assign(ProjectFiltersRoot, {
  Search: ProjectFiltersSearch,
  Status: ProjectFiltersStatus,
  Range: ProjectFiltersRange,
  Group: ProjectFiltersGroup,
});
