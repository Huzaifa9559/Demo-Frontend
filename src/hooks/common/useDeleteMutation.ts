import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryKeyBuilderGeneric, ServiceFunctions, EntityWithKey } from './types'

export const useDeleteMutation = <
  TEntity extends EntityWithKey,
  TCreatePayload = unknown,
  TUpdatePayload = unknown,
  TListParams = unknown,
>(
  service: ServiceFunctions<TEntity, TCreatePayload, TUpdatePayload, TListParams>,
  queryKeys: QueryKeyBuilderGeneric,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => service.delete(id),
    onSuccess: (_, deletedId) => {
      // Update all list queries in the cache
      queryClient.setQueriesData<TEntity[]>(
        { queryKey: queryKeys.lists() },
        (oldData) => {
          if (!oldData) return []
          return oldData.filter((entity) => entity.key !== deletedId)
        },
      )
      // Remove the detail query from the cache
      queryClient.removeQueries({
        queryKey: queryKeys.detail(deletedId),
      })
      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
    },
  })
}

