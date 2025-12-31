import { queryKeys, useGetQuery } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { PaginatedResponse, ResourceRecord } from "@/types";
import type { ResourceListParams } from "./types";

export const useGetResources = (params?: ResourceListParams) => {
  const queryParams: Record<string, unknown> = {};
  
  if (params?.search) queryParams.search = params.search;
  if (params?.type) queryParams.type = params.type;
  if (params?.category) queryParams.category = params.category;
  if (params?.status) queryParams.status = params.status;
  if (params?.tag) queryParams.tag = params.tag;
  if (params?.sortBy) queryParams.sortBy = params.sortBy;
  if (params?.sortOrder) queryParams.sortOrder = params.sortOrder;

  queryParams.page = params?.page ?? 1;
  queryParams.pageSize = params?.pageSize ?? 12;
  
  return useGetQuery<PaginatedResponse<ResourceRecord>>({
    key: [queryKeys.resources.list, ...Object.values(queryParams)],
    url: apiEndpoints.resources.list,
    params: queryParams as Record<string, unknown>,
  });
};

