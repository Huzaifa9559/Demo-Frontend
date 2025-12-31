import { queryKeys, usePatchMutation } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ResourceRecord } from "@/types";
import type { UpdateResourcePayload } from "./types";

export const useUpdateResource = () => {
  return usePatchMutation<ResourceRecord, UpdateResourcePayload, string>({
    url: apiEndpoints.resources.update,
    keyToInvalidate: { queryKey: [queryKeys.resources.list, queryKeys.resources.detail] },
  });
};

