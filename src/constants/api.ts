// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// export const API_ENDPOINTS = {
//   projects: {
//     list: '/projects',
//     detail: (id: string) => `/projects/${id}`,
//     create: '/projects',
//     update: (id: string) => `/projects/${id}`,
//     delete: (id: string) => `/projects/${id}`,
//   },
// } as const

export const QUERY_KEYS = {
  projects: {
    all: ['projects'] as const,
    lists: () => [...QUERY_KEYS.projects.all, 'list'] as const,
    list: (filters?: {
      search?: string
      status?: string
      range?: string
    }) => [...QUERY_KEYS.projects.lists(), filters] as const,
    details: () => [...QUERY_KEYS.projects.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.projects.details(), id] as const,
  },
} as const

