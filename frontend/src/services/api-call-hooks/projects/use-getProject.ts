import { queryKeys, useGetQuery } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ProjectRecord } from "@/types";

export const useGetProject = (id: string) => {
  return useGetQuery<ProjectRecord>({
    key: [queryKeys.projects.detail, id],
    url: apiEndpoints.projects.detail,
    params: { id },
  });
};

