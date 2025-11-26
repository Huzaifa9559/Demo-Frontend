import { useQuery } from '@tanstack/react-query'
import type { QueryKeyBuilder, ServiceFunctions, UseListQueryOptions, EntityWithKey } from './types'

export const useListQuery = <
  TEntity extends EntityWithKey,
  TListParams = unknown,
>(
  service: ServiceFunctions<TEntity, any, any, TListParams>,
  queryKeys: QueryKeyBuilder<TListParams>,
  options?: UseListQueryOptions<TListParams>,
) => {
  return useQuery({
    queryKey: queryKeys.list(options?.params),
    queryFn: () => service.list(options?.params),
    staleTime: options?.staleTime ?? 1000 * 60 * 5, // Data is fresh for 5 minutes
    gcTime: options?.gcTime ?? 1000 * 60 * 30, // Keep in cache for 30 minutes when unused
    enabled: options?.enabled ?? true,
  })
}

