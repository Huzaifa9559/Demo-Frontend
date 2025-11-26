import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryKeyBuilderGeneric, ServiceFunctions, EntityWithKey } from './types'

export const useUpdateMutation = <
  TEntity extends EntityWithKey,
  TUpdatePayload,
>(
  service: ServiceFunctions<TEntity, any, TUpdatePayload, any>,
  queryKeys: QueryKeyBuilderGeneric,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: TUpdatePayload
    }) => service.update(id, payload),
    onSuccess: (updatedEntity) => {
      // Update all list queries in the cache
      queryClient.setQueriesData<TEntity[]>(
        { queryKey: queryKeys.lists() },
        (oldData) => {
          if (!oldData) return [updatedEntity]
          return oldData.map((entity) =>
            entity.key === updatedEntity.key ? updatedEntity : entity,
          )
        },
      )
      // Update the detail query in the cache
      queryClient.setQueryData(
        queryKeys.detail(updatedEntity.key),
        updatedEntity,
      )
      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.detail(updatedEntity.key),
      })
    },
  })
}

