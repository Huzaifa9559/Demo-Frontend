import { queryKeys, usePostMutation } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ResourceRecord } from "@/types";
import type { CreateResourcePayload } from "./types";

export const useCreateResource = () => {
  return usePostMutation<ResourceRecord, CreateResourcePayload>({
    url: apiEndpoints.resources.create,
    keyToInvalidate: { queryKey: [queryKeys.resources.list] },
  });
};

