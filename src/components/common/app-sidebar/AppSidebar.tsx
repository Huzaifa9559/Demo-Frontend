import { useNavigation } from "@hooks";
import type { SideBarTab } from "../layout/layout-utility";

type AppSidebarProps = {
  activeTab: SideBarTab;
  setActiveTab: (tab: SideBarTab) => void;
  sideBarTabs: SideBarTab[];
};

export const AppSidebar = ({
  activeTab,
  setActiveTab,
  sideBarTabs,
}: AppSidebarProps) => {
  const { goTo } = useNavigation();

  const handleTabClick = (tab: SideBarTab) => {
    setActiveTab(tab);
    goTo(tab.url);
  };

  return (
    <div className="w-64 bg-slate-900 text-white shadow-lg shadow-slate-900/20 flex flex-col">
      <div className="px-6 py-5 text-lg font-semibold tracking-tight text-white">
        Ant Design Starter
      </div>
      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {sideBarTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab.url === tab.url;
            return (
              <li key={tab.url}>
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon />
                  <span>{tab.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
