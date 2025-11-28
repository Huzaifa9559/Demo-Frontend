import { usePostMutation } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ProjectRecord } from "@/types";
import type { CreateProjectPayload } from "./types";

export const useCreateProject = () => {
  return usePostMutation<ProjectRecord, CreateProjectPayload>({
    url: apiEndpoints.projects.create,
    keyToInvalidate: { queryKey: ["projects"] },
  });
};

