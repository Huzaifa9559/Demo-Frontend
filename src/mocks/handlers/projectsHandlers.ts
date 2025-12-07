import dayjs from "dayjs";
import { setupWorker } from "msw/browser";
import { PROJECT_ROWS } from "@/mocks/data/projects";
import { RangeFilter, StatusFilter } from "@utils";
import type { ProjectRecord } from "@/types";
import { createCrudHandlers } from "./createCrudHandlers";
import { authHandlers } from "./authHandlers";

type ProjectListParams = {
  search?: string;
  status?: StatusFilter;
  range?: RangeFilter;
};

type CreateProjectPayload = Omit<ProjectRecord, "key">;
type UpdateProjectPayload = Partial<CreateProjectPayload>;

/**
 * Project-specific filter function
 */
const filterProjects = (
  projects: ProjectRecord[],
  params: ProjectListParams
): ProjectRecord[] => {
  const normalizedSearch = params.search?.trim().toLowerCase();
  const statusFilter = params.status ?? "all";
  const rangeFilter: RangeFilter = params.range ?? "quarter";
  const now = dayjs();
  const rangeEndMap: Record<RangeFilter, dayjs.Dayjs> = {
    week: now.add(7, "day"),
    month: now.add(1, "month"),
    quarter: now.add(3, "month"),
  };
  const rangeEnd = rangeEndMap[rangeFilter];

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
};

/**
 * Parse query parameters for projects
 */
const parseProjectQueryParams = (url: URL): ProjectListParams => {
  return {
    search: url.searchParams.get("search") ?? undefined,
    status:
      (url.searchParams.get("status") as StatusFilter | null) ?? undefined,
    range: (url.searchParams.get("range") as RangeFilter | null) ?? undefined,
  };
};

/**
 * Create project handlers using the generic CRUD factory
 */
export const projectsHandlers = createCrudHandlers<
  ProjectRecord,
  CreateProjectPayload,
  UpdateProjectPayload,
  ProjectListParams
>({
  endpoint: "/api/projects",
  storageKey: "MOCK_PROJECTS_DATA",
  initialData: PROJECT_ROWS,
  filterFn: filterProjects,
  parseQueryParams: parseProjectQueryParams,
  delays: {
    list: 300,
    get: 250,
    create: 400,
    update: 400,
    delete: 300,
  },
  notFoundMessage: "Project not found",
});

export const worker = setupWorker(...projectsHandlers, ...authHandlers);
