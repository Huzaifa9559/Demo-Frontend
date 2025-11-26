export type EntityWithKey = {
  key: string
  [key: string]: unknown
}

export type QueryKeyBuilder<TFilters = unknown> = {
  lists: () => readonly unknown[]
  list: (filters?: TFilters) => readonly unknown[]
  details: () => readonly unknown[]
  detail: (id: string) => readonly unknown[]
}

export type QueryKeyBuilderGeneric = {
  lists: () => readonly unknown[]
  list: (filters?: any) => readonly unknown[]
  details: () => readonly unknown[]
  detail: (id: string) => readonly unknown[]
}

export type ServiceFunctions<TEntity extends EntityWithKey, TCreatePayload, TUpdatePayload, TListParams = unknown> = {
  list: (params?: TListParams) => Promise<TEntity[]>
  getById: (id: string) => Promise<TEntity>
  create: (payload: TCreatePayload) => Promise<TEntity>
  update: (id: string, payload: TUpdatePayload) => Promise<TEntity>
  delete: (id: string) => Promise<void>
}

export type UseListQueryOptions<TListParams = unknown> = {
  params?: TListParams
  staleTime?: number
  gcTime?: number
  enabled?: boolean
}

export type UseDetailQueryOptions = {
  id: string | null
  staleTime?: number
  gcTime?: number
  enabled?: boolean
}

