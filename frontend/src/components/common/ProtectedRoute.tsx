import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store";
import { ROUTE_URLS } from "@utils";
import type { UserRole } from "@/types/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated = false, user = null } = authState || {};
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTE_URLS.login} state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTE_URLS.notFound} replace />;
  }

  return <>{children}</>;
};
