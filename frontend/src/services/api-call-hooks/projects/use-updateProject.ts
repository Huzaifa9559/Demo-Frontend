import { apiEndpoints } from "../../api-constants";
import type { ProjectRecord } from "@/types";
import type { UpdateProjectPayload } from "./types";
import { queryKeys, usePatchMutation } from "@services";

export const useUpdateProject = () => {
  return usePatchMutation<ProjectRecord, UpdateProjectPayload, string>({
    url: apiEndpoints.projects.update,
    keyToInvalidate: { queryKey: [queryKeys.projects.list, queryKeys.projects.detail] },
  }); 
};

