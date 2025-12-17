import type { ProjectRecord } from "@/types";

export type ProjectListParams = {
  search?: string;
  status?: string;
  range?: string;
  page?: number;
  pageSize?: number;
};

export type CreateProjectPayload = Omit<ProjectRecord, "key">;
export type UpdateProjectPayload = Partial<Omit<ProjectRecord, "key">>;
