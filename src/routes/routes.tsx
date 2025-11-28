import { ROUTE_URLS } from "@utils";
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
} from "@pages";
import { Layout } from "@components";

const AppRoutes = [
  { path: "/", element: <Navigate to={ROUTE_URLS.home} replace /> },
  {
    path: ROUTE_URLS.home,
    element: <HomeScreen />,
  },
  {
    path: ROUTE_URLS.projects,
    element: <ProjectsScreen />,
  },
  {
    path: ROUTE_URLS.settings,
    element: <SettingsScreen />,
  },
  {
    path: ROUTE_URLS.analytics,
    element: <AnalyticsScreen />,
  },
  {
    path: ROUTE_URLS.team,
    element: <TeamScreen />,
  },
  {
    path: ROUTE_URLS.resources,
    element: <ResourcesScreen />,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      ...AppRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
