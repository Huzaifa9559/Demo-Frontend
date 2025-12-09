import { useDeleteMutation } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ProjectRecord } from "@/types";

export const useDeleteProject = () => {
  return useDeleteMutation<ProjectRecord>({
    url: apiEndpoints.projects.list,
    keyToInvalidate: { queryKey: ["projects"] },
  });
};

