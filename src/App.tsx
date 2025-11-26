import { Layout } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BarChartOutlined,
  BookOutlined,
  CalendarOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { AppSider } from '@components'
import { ROUTE_MAP } from '@constants/routes'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'

const menuItems: MenuProps['items'] = [
  { key: 'home', icon: <HomeOutlined />, label: 'Home' },
  { key: 'projects', icon: <CalendarOutlined />, label: 'Projects' },
  { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics' },
  { key: 'team', icon: <TeamOutlined />, label: 'Team' },
  { key: 'resources', icon: <BookOutlined />, label: 'Resources' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
]

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = useMemo(() => {
    const currentPath = location.pathname
    const matchedKey = Object.entries(ROUTE_MAP).find(
      ([, path]) => path === currentPath,
    )?.[0]
    return matchedKey ? [matchedKey] : undefined
  }, [location.pathname])

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const route = ROUTE_MAP[key as keyof typeof ROUTE_MAP]
    if (route) {
      navigate(route)
    }
  }

  return (
    <Layout className="min-h-screen bg-slate-100">
      <AppSider
        title="Ant Design Starter"
        menuItems={menuItems}
        selectedKeys={selectedKey}
        onMenuClick={handleMenuClick}
      />
      <Layout className="bg-transparent">
        <Layout.Content className="p-6 md:p-10">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default App
