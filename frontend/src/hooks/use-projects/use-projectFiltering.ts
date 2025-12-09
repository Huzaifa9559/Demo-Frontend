import { useMemo } from "react";
import dayjs from "dayjs";
import type { ProjectRecord } from "@/types";
import { type RangeFilter, type StatusFilter } from "@utils";

type UseProjectFilteringOptions = {
  projects: ProjectRecord[];
  searchTerm: string;
  statusFilter: StatusFilter;
  rangeFilter: RangeFilter;
};

export const useProjectFiltering = ({
  projects,
  searchTerm,
  statusFilter,
  rangeFilter,
}: UseProjectFilteringOptions) => {
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const now = dayjs();

    const rangeEnd = {
      week: now.add(7, "day"),
      month: now.add(1, "month"),
      quarter: now.add(3, "month"),
    }[rangeFilter];

    return projects.filter((project) => {
      const due = dayjs(project.dueDate, "MMM D, YYYY");

      const matchesSearch =
        !normalizedSearch ||
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.projectCode.toLowerCase().includes(normalizedSearch) ||
        project.owner.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && project.status === "In Progress") ||
        (statusFilter === "hold" && project.status === "On Hold") ||
        (statusFilter === "completed" && project.status === "Completed") ||
        (statusFilter === "blocked" && project.status === "Blocked");

      const matchesRange =
        due.isBefore(rangeEnd) && due.isAfter(now.subtract(1, "day"));

      return matchesSearch && matchesStatus && matchesRange;
    });
  }, [projects, rangeFilter, searchTerm, statusFilter]);

  return { filteredProjects };
};
