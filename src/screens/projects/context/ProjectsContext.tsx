import { createContext, useContext } from 'react'
import type { TablePaginationConfig, TableProps } from 'antd'
import type { ProjectRecord } from '@data/projects'
import type { RangeFilter, StatusFilter } from '@constants/filters'
import type { ProjectFormValues } from '../components/ProjectFormModal'

export type ProjectsContextValue = {
  projects: ProjectRecord[]
  filteredProjects: ProjectRecord[]
  statusColors: Record<ProjectRecord['status'], string>
  isLoading: boolean
  searchValue: string
  statusValue: StatusFilter
  rangeValue: RangeFilter
  pagination: TablePaginationConfig
  onSearchChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
  onRangeChange: (value: RangeFilter) => void
  onTableChange: TableProps<ProjectRecord>['onChange']
  openCreateForm: () => void
  openEditForm: (project: ProjectRecord) => void
  openDetails: (project: ProjectRecord) => void
  closeDetails: () => void
  isFormOpen: boolean
  isDetailsOpen: boolean
  formMode: 'create' | 'edit'
  selectedProject: ProjectRecord | null
  handleFormSubmit: (values: ProjectFormValues) => Promise<void>
  closeForm: () => void
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined)

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error('useProjectsContext must be used within a ProjectsContext provider')
  }
  return context
}

export const ProjectsContextProvider = ProjectsContext.Provider

