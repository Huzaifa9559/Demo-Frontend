import type { ProjectRecord } from "@/types";

export type ProjectListParams = {
  search?: string;
  status?: string;
  range?: string;
};

export type CreateProjectPayload = Omit<ProjectRecord, "key">;
export type UpdateProjectPayload = Partial<Omit<ProjectRecord, "key">>;
