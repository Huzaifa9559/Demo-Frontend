import { ROUTE_URLS } from "@utils";
import {
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export type SideBarTab = {
  title: string;
  url: string;
  icon: React.ComponentType;
};

export const sideBarTabs: SideBarTab[] = [
  {
    title: "Home",
    url: ROUTE_URLS.home,
    icon: HomeOutlined,
  },
  {
    title: "Projects",
    url: ROUTE_URLS.projects,
    icon: CalendarOutlined,
  },
  {
    title: "Analytics",
    url: ROUTE_URLS.analytics,
    icon: BarChartOutlined,
  },
  {
    title: "Team",
    url: ROUTE_URLS.team,
    icon: TeamOutlined,
  },
  {
    title: "Resources",
    url: ROUTE_URLS.resources,
    icon: BookOutlined,
  },
  {
    title: "Settings",
    url: ROUTE_URLS.settings,
    icon: SettingOutlined,
  },
];
