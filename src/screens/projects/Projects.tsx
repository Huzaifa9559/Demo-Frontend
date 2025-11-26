import { type ReactNode } from 'react'
import { ProjectsContextProvider, type ProjectsContextValue } from './context/ProjectsContext'
import { ProjectsHeader } from './components/ProjectsHeader'
import { ProjectsCard } from './components/ProjectsCard'
import { ProjectFilters } from './components/ProjectFilters'
import { ProjectTable } from './components/ProjectTable'
import { ProjectDetailsModal } from './components/ProjectDetailsModal'
import { ProjectFormModal } from './components/ProjectFormModal'

type ProjectsProps = {
  children: ReactNode
  value: ProjectsContextValue
}

const Projects = ({ children, value }: ProjectsProps) => {
  return <ProjectsContextProvider value={value}>{children}</ProjectsContextProvider>
}

// Attach sub-components to create compound component pattern
Projects.Header = ProjectsHeader
Projects.Card = ProjectsCard
Projects.Filters = ProjectFilters
Projects.Table = ProjectTable
Projects.DetailsModal = ProjectDetailsModal
Projects.FormModal = ProjectFormModal

export { Projects }

