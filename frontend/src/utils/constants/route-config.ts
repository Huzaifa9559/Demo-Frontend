import type { UserRole } from "@/types/user";
import { ROUTE_URLS } from "./route-urls";

export interface RouteConfig {
  path: string;
  allowedRoles?: UserRole[];
}

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  home: {
    path: ROUTE_URLS.home,
    allowedRoles: ["admin", "user"],
  },
  projects: {
    path: ROUTE_URLS.projects,
    allowedRoles: ["admin", "user"],
  },
  analytics: {
    path: ROUTE_URLS.analytics,
    allowedRoles: ["admin"],
  },
  team: {
    path: ROUTE_URLS.team,
    allowedRoles: ["admin"],
  },
  resources: {
    path: ROUTE_URLS.resources,
    allowedRoles: ["admin", "user"],
  },
  settings: {
    path: ROUTE_URLS.settings,
    allowedRoles: ["admin"],
  },
};

