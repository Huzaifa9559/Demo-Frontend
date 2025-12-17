import { Search, Dropdown } from "@components/ui";
import {
  RANGE_OPTIONS,
  STATUS_OPTIONS,
} from "@utils";

type ProjectFiltersProps = {
  className?: string;
};

const STATUS_DROPDOWN_OPTIONS = STATUS_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
}));

const RANGE_DROPDOWN_OPTIONS = RANGE_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
}));

export const ProjectFilters = ({
  className,
}: ProjectFiltersProps) => {
  return (  
    <div
      className={`flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between ${
        className ?? ""
      }`}
    >
      <Search
        placeholder="Search projects"
        allowClear
        className="w-full md:max-w-sm"
      />
      <div className="flex flex-col gap-3 md:flex-row">
        <Dropdown
          paramKey="status"
          className="w-full md:w-48"
          options={STATUS_DROPDOWN_OPTIONS}
          defaultValue="all"
        />
        <Dropdown
          paramKey="range"
          className="w-full md:w-48"
          options={RANGE_DROPDOWN_OPTIONS}
          defaultValue="quarter"
        />
      </div>
    </div>
  );
};
