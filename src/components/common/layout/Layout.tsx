import { Outlet } from "react-router-dom";
import { AppSidebar } from "../app-sidebar";
import { useNavigation } from "@hooks";
import { useCallback, useState, useEffect } from "react";
import { sideBarTabs } from "./layout-utility";

export const Layout = () => {
  const { location } = useNavigation();

  const getInitialActiveTab = useCallback(() => {
    return (
      sideBarTabs.find((tab) => location.pathname.startsWith(tab.url)) ??
      sideBarTabs[0]
    );
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState(getInitialActiveTab());

  useEffect(() => {
    const newActiveTab = getInitialActiveTab();
    setActiveTab(newActiveTab);
  }, [getInitialActiveTab]);

  return (
    <div className="fixed inset-0 flex">
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sideBarTabs={sideBarTabs}
      />
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col m-4 gap-4 overflow-auto sm:overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
