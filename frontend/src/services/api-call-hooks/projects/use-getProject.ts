import { useGetQuery } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ProjectRecord } from "@/types";

export const useGetProject = (id: string | null) => {
  return useGetQuery<ProjectRecord>({
    key: id ? ["projects", "detail", id] : ["projects", "detail", null],
    url: id ? apiEndpoints.projects.detail(id) : apiEndpoints.projects.list,
    options: {
      enabled: !!id,
    },
  });
};

