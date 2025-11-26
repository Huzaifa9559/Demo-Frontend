import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryKeyBuilderGeneric, ServiceFunctions, EntityWithKey } from './types'

export const useCreateMutation = <
  TEntity extends EntityWithKey,
  TCreatePayload,
>(
  service: ServiceFunctions<TEntity, TCreatePayload, any, any>,
  queryKeys: QueryKeyBuilderGeneric,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: TCreatePayload) => service.create(payload),
    onSuccess: (newEntity) => {
      // Update all list queries in the cache
      queryClient.setQueriesData<TEntity[]>(
        { queryKey: queryKeys.lists() },
        (oldData) => {
          if (!oldData) return [newEntity]
          return [newEntity, ...oldData]
        },
      )
      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
    },
  })
}

