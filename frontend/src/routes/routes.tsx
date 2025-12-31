import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE_URLS } from "@utils";
import { Layout, ProtectedRoute, PublicRoute } from "@components";
import { NotFound } from "@pages";
import { privateRoutes, publicRoutes } from "./route-config";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      ...publicRoutes,
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      ...privateRoutes,
    ],
  },
  {
    path: ROUTE_URLS.notFound,
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
