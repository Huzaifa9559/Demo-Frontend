export const ROUTES = {
  home: '/',
  projects: '/projects',
  analytics: '/analytics',
  team: '/team',
  resources: '/resources',
  settings: '/settings',
} as const

export const ROUTE_KEYS = {
  home: 'home',
  projects: 'projects',
  analytics: 'analytics',
  team: 'team',
  resources: 'resources',
  settings: 'settings',
} as const

export type RouteKey = (typeof ROUTE_KEYS)[keyof typeof ROUTE_KEYS]
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export const ROUTE_MAP: Record<RouteKey, RoutePath> = (
  Object.keys(ROUTES) as Array<keyof typeof ROUTES>
).reduce(
  (acc, key) => {
    acc[ROUTE_KEYS[key]] = ROUTES[key]
    return acc
  },
  {} as Record<RouteKey, RoutePath>,
)

