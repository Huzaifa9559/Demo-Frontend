import { Outlet, Navigate } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { useNavigation } from "@hooks";
import { useCallback, useState, useEffect, useMemo } from "react";
import { sideBarTabs } from "./layout-utility";
import { useAppSelector } from "@/store";
import { ROUTE_URLS, ROUTE_CONFIG } from "@utils";
import type { SideBarTab } from "./layout-utility";

export const Layout = () => {
  const { location } = useNavigation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTE_URLS.login} replace />;
  }

  // Filter sidebar tabs based on user role
  const filteredSideBarTabs = useMemo(() => {
    if (!user) return [];
    return sideBarTabs.filter((tab) => {
      const routeConfig = Object.values(ROUTE_CONFIG).find(
        (config) => config.path === tab.url
      );
      if (!routeConfig || !routeConfig.allowedRoles) return true;
      return routeConfig.allowedRoles.includes(user.role);
    });
  }, [user]);

  const getInitialActiveTab = useCallback(() => {
    return (
      filteredSideBarTabs.find((tab) => location.pathname.startsWith(tab.url)) ??
      filteredSideBarTabs[0]
    );
  }, [location.pathname, filteredSideBarTabs]);

  const [activeTab, setActiveTab] = useState<SideBarTab | null>(null);

  useEffect(() => {
    if (filteredSideBarTabs.length > 0) {
      const newActiveTab = getInitialActiveTab();
      setActiveTab(newActiveTab);
    }
  }, [getInitialActiveTab, filteredSideBarTabs]);

  if (!activeTab || filteredSideBarTabs.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex">
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sideBarTabs={filteredSideBarTabs}
      />
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col m-4 gap-4 overflow-auto sm:overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
