import { queryKeys, useGetQuery } from "../../api-query-hooks";
import { apiEndpoints } from "../../api-constants";
import type { ResourceRecord } from "@/types";

export const useGetResource = (id: string) => {
  return useGetQuery<ResourceRecord>({
    key: [queryKeys.resources.detail, id],
    url: apiEndpoints.resources.detail.replace(':id', id),
  });
};

