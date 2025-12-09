import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiEndpoints } from "../../api-constants";
import { apiService } from "../../api-service";
import type { ProjectRecord } from "@/types";
import type { UpdateProjectPayload } from "./types";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ProjectRecord,
    Error,
    { id: string; payload: UpdateProjectPayload }
  >({
    mutationFn: async (data) => {
      const url = apiEndpoints.projects.update(data.id);
      return apiService.put<ProjectRecord, UpdateProjectPayload>(
        url,
        data.payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

