import type { UserRole } from "@/types/user";
import { ROUTE_URLS } from "./route-urls";

export interface RouteConfig {
  path: string;
  allowedRoles?: UserRole[];
}

/**
 * Role-based route configuration
 * - admin: Can access all routes
 * - user: Limited access to specific routes
 */
export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  home: {
    path: ROUTE_URLS.home,
    allowedRoles: ["admin", "user"], // Both roles can access
  },
  projects: {
    path: ROUTE_URLS.projects,
    allowedRoles: ["admin", "user"], // Both roles can access
  },
  analytics: {
    path: ROUTE_URLS.analytics,
    allowedRoles: ["admin"], // Only admin can access
  },
  team: {
    path: ROUTE_URLS.team,
    allowedRoles: ["admin"], // Only admin can access
  },
  resources: {
    path: ROUTE_URLS.resources,
    allowedRoles: ["admin", "user"], // Both roles can access
  },
  settings: {
    path: ROUTE_URLS.settings,
    allowedRoles: ["admin"], // Only admin can access
  },
};

