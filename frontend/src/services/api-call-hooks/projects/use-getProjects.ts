import { useGetQuery } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { PaginatedResponse, ProjectRecord } from "@/types";
import type { ProjectListParams } from "./types";

export const useGetProjects = (params?: ProjectListParams) => {
  const queryParams: Record<string, unknown> = {};
  if (params?.search) queryParams.search = params.search;
  if (params?.status) queryParams.status = params.status;
  if (params?.range) queryParams.range = params.range;

  queryParams.page = params?.page ?? 1;
  queryParams.pageSize = params?.pageSize ?? 10;
  
  return useGetQuery<PaginatedResponse<ProjectRecord>>({
    key: ["projects", "list", queryParams],
    url: apiEndpoints.projects.list,
    params: queryParams,
  });
};
