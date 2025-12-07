import { useNavigation } from "@hooks";
import type { SideBarTab } from "../layout/layout-utility";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store";
import { ROUTE_URLS } from "@utils";
import { LogoutOutlined } from "@ant-design/icons";

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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleTabClick = (tab: SideBarTab) => {
    setActiveTab(tab);
    goTo(tab.url);
  };

  const handleLogout = () => {
    dispatch(logout());
    goTo(ROUTE_URLS.login);
  };

  return (
    <div className="w-64 bg-slate-900 text-white shadow-lg shadow-slate-900/20 flex flex-col">
      <div className="px-6 py-5 text-lg font-semibold tracking-tight text-white">
        Ant Design Starter
      </div>
      {user && (
        <div className="px-6 py-2 text-sm text-slate-300 border-b border-slate-700">
          <div className="font-medium text-white">{user.name}</div>
          <div className="text-xs text-slate-400 capitalize">{user.role}</div>
        </div>
      )}
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
      <div className="px-4 py-2 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <LogoutOutlined />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
