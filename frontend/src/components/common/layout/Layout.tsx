import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { useNavigation } from "@hooks";
import { useCallback, useState, useEffect, useMemo } from "react";
import { sideBarTabs } from "./layout-utility";
import { useAppSelector } from "@/store";
import { ROUTE_CONFIG } from "@utils";
import type { SideBarTab } from "./layout-utility";

export const Layout = () => {
  const { location } = useNavigation();
  const { user } = useAppSelector((state) => state.auth);

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

  const getInitialActiveTab = useCallback((): SideBarTab | null => {
    if (filteredSideBarTabs.length === 0) return null;
    return (
      filteredSideBarTabs.find((tab) => location.pathname.startsWith(tab.url)) ??
      filteredSideBarTabs[0] ??
      null
    );
  }, [location.pathname, filteredSideBarTabs]);

  const [activeTab, setActiveTab] = useState<SideBarTab | null>(() => getInitialActiveTab());

  useEffect(() => {
    const newActiveTab = getInitialActiveTab();
    if (newActiveTab) {
      setActiveTab(newActiveTab);
    }
  }, [getInitialActiveTab]);

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
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex flex-col m-4 gap-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
