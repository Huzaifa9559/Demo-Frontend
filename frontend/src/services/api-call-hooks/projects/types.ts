import type { ProjectRecord } from "@/types";
import type { StatusFilter, RangeFilter } from "@/types/project";

export type ProjectListParams = {
  search?: string;
  status?: StatusFilter | ProjectRecord["status"];
  range?: RangeFilter;
  page?: number;
  pageSize?: number;
};

export type CreateProjectPayload = Omit<ProjectRecord, "key">;
export type UpdateProjectPayload = Partial<Omit<ProjectRecord, "key">>;
