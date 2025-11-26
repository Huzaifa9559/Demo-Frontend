import { createBrowserRouter, useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import { ProjectsScreen } from '@/screens/projects'
import App from '@/App'
import { Button } from '@components/ui'

const HomePage = () => {
  const navigate = useNavigate()
  return (
  <div className="flex flex-col items-center justify-center h-full">
    <h1 className="text-2xl font-semibold text-slate-700">Welcome Home</h1>
    <Button className='mt-4' onClick={() => navigate(ROUTES.projects)}>
      Go to Projects
      </Button>
    </div>
  )
}

const AnalyticsPage = () => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-semibold text-slate-700">Analytics</h1>
  </div>
)

const TeamPage = () => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-semibold text-slate-700">Team</h1>
  </div>
)

const ResourcesPage = () => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-semibold text-slate-700">Resources</h1>
  </div>
)

const SettingsPage = () => (
  <div className="flex items-center justify-center h-full">
    <h1 className="text-2xl font-semibold text-slate-700">Settings</h1>
  </div>
)

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4">
    <h1 className="text-4xl font-bold text-slate-900">404</h1>
    <p className="text-lg text-slate-600">Page not found</p>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.projects,
        element: <ProjectsScreen />,
      },
      {
        path: ROUTES.analytics,
        element: <AnalyticsPage />,
      },
      {
        path: ROUTES.team,
        element: <TeamPage />,
      },
      {
        path: ROUTES.resources,
        element: <ResourcesPage />,
      },
      {
        path: ROUTES.settings,
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
