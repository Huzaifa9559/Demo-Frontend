import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store";
import { ROUTE_URLS } from "@utils";

export const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    // Redirect to the page they were trying to access, or home as fallback
    const from = (location.state as { from?: Location })?.from?.pathname || ROUTE_URLS.home;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

