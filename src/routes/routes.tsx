import { ROUTE_URLS, ROUTE_CONFIG } from "@utils";
import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  HomeScreen,
  ProjectsScreen,
  SettingsScreen,
  AnalyticsScreen,
  TeamScreen,
  ResourcesScreen,
  NotFound,
  LoginScreen,
} from "@pages";
import { Layout, ProtectedRoute } from "@components";

const PrivateRoutes = [
  { 
    path: "/", 
    element: <Navigate to={ROUTE_URLS.home} replace /> 
  },
  {
    path: ROUTE_URLS.home,
    element: (
      <ProtectedRoute allowedRoles={ROUTE_CONFIG.home.allowedRoles}>
        <HomeScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_URLS.projects,
    element: (
      <ProtectedRoute allowedRoles={ROUTE_CONFIG.projects.allowedRoles}>
        <ProjectsScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_URLS.settings,
    element: (
      <ProtectedRoute allowedRoles={ROUTE_CONFIG.settings.allowedRoles}>
        <SettingsScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_URLS.analytics,
    element: (
      <ProtectedRoute allowedRoles={ROUTE_CONFIG.analytics.allowedRoles}>
        <AnalyticsScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_URLS.team,
    element: (
      <ProtectedRoute allowedRoles={ROUTE_CONFIG.team.allowedRoles}>
        <TeamScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTE_URLS.resources,
    element: (
      <ProtectedRoute allowedRoles={ROUTE_CONFIG.resources.allowedRoles}>
        <ResourcesScreen />
      </ProtectedRoute>
    ),
  },
];

const PublicRoutes = [
  {
    path: ROUTE_URLS.login,
    element: <LoginScreen />,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...PrivateRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  ...PublicRoutes,
]);

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
