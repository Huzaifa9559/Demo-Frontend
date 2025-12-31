import { queryKeys, useDeleteMutation } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ResourceRecord } from "@/types";

export const useDeleteResource = () => {
  return useDeleteMutation<ResourceRecord>({
    url: apiEndpoints.resources.delete,
    keyToInvalidate: { queryKey: [queryKeys.resources.list] },
  });
};

