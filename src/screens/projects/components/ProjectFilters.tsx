import { Search, Dropdown } from '@components/ui'
import {
  RANGE_OPTIONS,
  STATUS_OPTIONS,
  type RangeFilter,
  type StatusFilter,
} from '@constants/filters'
import { useProjectsContext } from '../context/ProjectsContext'

type ProjectFiltersProps = {
  className?: string
}

export const ProjectFilters = ({ className }: ProjectFiltersProps = {}) => {
  const {
    searchValue,
    statusValue,
    rangeValue,
    onSearchChange,
    onStatusChange,
    onRangeChange,
  } = useProjectsContext()

  return (
    <div
      className={`flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between ${className ?? ''}`}
    >
      <Search
        placeholder="Search projects"
        allowClear
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        onSearch={onSearchChange}
        className="w-full md:max-w-sm"
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <Dropdown
          value={statusValue}
          options={STATUS_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
          onChange={(value) => onStatusChange(value as StatusFilter)}
          className="w-full md:w-48"
        />
        <Dropdown
          value={rangeValue}
          options={RANGE_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
          onChange={(value) => onRangeChange(value as RangeFilter)}
          className="w-full md:w-48"
        />
      </div>
    </div>
  )
}

