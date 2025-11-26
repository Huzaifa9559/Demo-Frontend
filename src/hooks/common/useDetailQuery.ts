import { useQuery } from '@tanstack/react-query'
import type { QueryKeyBuilderGeneric, ServiceFunctions, UseDetailQueryOptions, EntityWithKey } from './types'

export const useDetailQuery = <TEntity extends EntityWithKey>(
  service: ServiceFunctions<TEntity, any, any, any>,
  queryKeys: QueryKeyBuilderGeneric,
  options: UseDetailQueryOptions,
) => {
  return useQuery({
    queryKey: queryKeys.detail(options.id ?? ''),
    queryFn: () => service.getById(options.id!),
    enabled: !!options.id && (options.enabled ?? true),
    staleTime: options.staleTime ?? 1000 * 60 * 5, // Data is fresh for 5 minutes
    gcTime: options.gcTime ?? 1000 * 60 * 30, // Keep in cache for 30 minutes when unused
  })
}

