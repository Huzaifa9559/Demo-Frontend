import { Layout, Menu, type MenuProps } from 'antd'

type AppSiderProps = {
  menuItems: MenuProps['items']
  title: string
  selectedKeys?: string[]
  onMenuClick?: MenuProps['onClick']
  className?: string
}

export const AppSider = ({
  menuItems = [],
  title,
  selectedKeys,
  onMenuClick,
  className,
}: AppSiderProps) => {
  const combinedClassName = [
    'bg-slate-900 text-white shadow-lg shadow-slate-900/20',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Layout.Sider
      breakpoint="lg"
      collapsedWidth="0"
      width={240}
      className={combinedClassName}
    >
      <div className="px-6 py-5 text-lg font-semibold tracking-tight text-white">
        {title}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems}
        onClick={onMenuClick}
      />
    </Layout.Sider>
  )
}

