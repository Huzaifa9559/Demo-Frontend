export const queryKeys = {
  projects: {
    list: (params?: Record<string, unknown>) => ['projects', 'list', ...(params ? [params] : [])],
    detail: (id: string) => ['projects', 'detail', id],
    create: (payload: Record<string, unknown>) => ['projects', 'create', ...(payload ? [payload] : [])],
    update: (id: string) => ['projects', 'update', id],
    delete: (id: string) => ['projects', 'delete', id],
  },
};
