import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { ROUTE_URLS, ROUTE_CONFIG } from "@utils";
import type { UserRole } from "@/types/user";
import {
  HomeScreen,
  ProjectsScreen,
  SettingsScreen,
  AnalyticsScreen,
  TeamScreen,
  ResourcesScreen,
  LoginScreen,
  SignupScreen,
  ForgetPasswordScreen,
} from "@pages";
import { ProtectedRoute } from "@components";

export type RouteDefinition = {
  path: string;
  element: ReactElement;
  allowedRoles?: UserRole[];
  isPublic?: boolean;
};

const createProtectedRoute = (
  path: string,
  Component: React.ComponentType,
  allowedRoles?: UserRole[]
): RouteDefinition => ({
  path,
  element: (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Component />
    </ProtectedRoute>
  ),
  allowedRoles,
});

const createPublicRoute = (path: string, Component: React.ComponentType): RouteDefinition => ({
  path,
  element: <Component />,
  isPublic: true,
});

export const routeDefinitions: RouteDefinition[] = [
  {
    path: "/",
    element: <Navigate to={ROUTE_URLS.home} replace />,
  },
  createProtectedRoute(ROUTE_URLS.home, HomeScreen, ROUTE_CONFIG.home.allowedRoles),
  createProtectedRoute(ROUTE_URLS.projects, ProjectsScreen, ROUTE_CONFIG.projects.allowedRoles),
  createProtectedRoute(ROUTE_URLS.settings, SettingsScreen, ROUTE_CONFIG.settings.allowedRoles),
  createProtectedRoute(ROUTE_URLS.analytics, AnalyticsScreen, ROUTE_CONFIG.analytics.allowedRoles),
  createProtectedRoute(ROUTE_URLS.team, TeamScreen, ROUTE_CONFIG.team.allowedRoles),
  createProtectedRoute(ROUTE_URLS.resources, ResourcesScreen, ROUTE_CONFIG.resources.allowedRoles),
  createPublicRoute(ROUTE_URLS.login, LoginScreen),
  createPublicRoute(ROUTE_URLS.signup, SignupScreen),
  createPublicRoute(ROUTE_URLS.forgetPassword, ForgetPasswordScreen),
];

export const privateRoutes = routeDefinitions
  .filter((route) => !route.isPublic)
  .map(({ path, element }) => ({ path, element }));

export const publicRoutes = routeDefinitions
  .filter((route) => route.isPublic)
  .map(({ path, element }) => ({ path, element }));

