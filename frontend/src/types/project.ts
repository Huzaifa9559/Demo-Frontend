// GraphQL types for projects
export type ProjectStatus = 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'BLOCKED';

export type Project = {
  id: string;
  projectCode: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  dueDate: string | Date;
  tickets: number;
  createdAt: string | Date;
  updatedAt?: string | Date | null;
};

export type CreateProjectInput = {
  projectCode: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  dueDate: string | Date;
  tickets: number;
};

export type UpdateProjectInput = {
  projectCode?: string;
  name?: string;
  owner?: string;
  status?: ProjectStatus;
  dueDate?: string | Date;
  tickets?: number;
};

export type ProjectsQueryInput = {
  search?: string;
  status?: ProjectStatus;
  range?: string;
  page?: number;
  take?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type PaginationMeta = {
  page: number;
  take: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ProjectsOutput = {
  data: Project[];
  meta: PaginationMeta;
};

// Legacy ProjectRecord type (for backward compatibility)
export type ProjectRecord = {
  key: string;
  projectCode: string;
  name: string;
  owner: string;
  status: "In Progress" | "On Hold" | "Completed" | "Blocked";
  dueDate: string;
  tickets: number;
};

export const PROJECT_STATUS_COLORS: Record<ProjectRecord["status"], string> = {
  "In Progress": "blue",
  "On Hold": "orange",
  Completed: "green",
  Blocked: "red",
};

export type StatusFilter = "all" | "active" | "hold" | "completed" | "blocked";
export type RangeFilter = "week" | "month" | "quarter";

export const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "In Progress", value: "active" },
  { label: "On Hold", value: "hold" },
  { label: "Completed", value: "completed" },
  { label: "Blocked", value: "blocked" },
] as const;

export const RANGE_OPTIONS = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Quarter", value: "quarter" },
] as const;
