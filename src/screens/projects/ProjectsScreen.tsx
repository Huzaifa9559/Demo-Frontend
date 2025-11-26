import { useMemo, useState } from 'react'
import type { TablePaginationConfig, TableProps } from 'antd'
import dayjs from 'dayjs'
import { type ProjectFormValues } from './components'
import { type RangeFilter, type StatusFilter } from '@constants/filters'
import { PROJECT_STATUS_COLORS, type ProjectRecord } from '@data/projects'
import { useCreateProject, useProjects, useUpdateProject } from '@hooks'
import { toaster } from '@components/ui'
import { Projects } from './Projects'

export const ProjectsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('quarter')
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '15', '20'],
  })

  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    null,
  )
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')

  const { data: projects = [], isLoading } = useProjects({
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    range: rangeFilter,
  })

  const createProject = useCreateProject()
  const updateProject = useUpdateProject()

  const filteredProjects = useMemo(() => {
    if (!projects.length) return []

    const normalizedSearch = searchTerm.trim().toLowerCase()
    const now = dayjs()

    const rangeEnd = {
      week: now.add(7, 'day'),
      month: now.add(1, 'month'),
      quarter: now.add(3, 'month'),
    }[rangeFilter]

    return projects.filter((project) => {
      const due = dayjs(project.dueDate, 'MMM D, YYYY')

      const matchesSearch =
        !normalizedSearch ||
        project.name.toLowerCase().includes(normalizedSearch) ||
        project.projectCode.toLowerCase().includes(normalizedSearch) ||
        project.owner.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && project.status === 'In Progress') ||
        (statusFilter === 'hold' && project.status === 'On Hold') ||
        (statusFilter === 'completed' && project.status === 'Completed') ||
        (statusFilter === 'blocked' && project.status === 'Blocked')

      const matchesRange = due.isBefore(rangeEnd) && due.isAfter(now.subtract(1, 'day'))

      return matchesSearch && matchesStatus && matchesRange
    })
  }, [projects, rangeFilter, searchTerm, statusFilter])

  const handleViewProject = (project: ProjectRecord) => {
    setSelectedProject(project)
    setIsDetailsOpen(true)
  }

  const handleEditProject = (project: ProjectRecord) => {
    setSelectedProject(project)
    setFormMode('edit')
    setIsFormOpen(true)
  }

  const handleCreateProject = () => {
    setSelectedProject(null)
    setFormMode('create')
    setIsFormOpen(true)
  }

  const handleFormSubmit = async (values: ProjectFormValues) => {
    const normalizedProject = {
      name: values.name,
      projectCode: values.projectCode,
      owner: values.owner,
      status: values.status,
      dueDate: values.dueDate.format('MMM D, YYYY'),
      tickets: values.tickets,
    }

    try {
      if (formMode === 'edit' && selectedProject) {
        await updateProject.mutateAsync({
          id: selectedProject.key,
          payload: normalizedProject,
        })
        toaster.success({ message: 'Project updated successfully' })
      } else {
        await createProject.mutateAsync(normalizedProject)
        toaster.success({ message: 'Project created successfully' })
      }
      setIsFormOpen(false)
      setSelectedProject(null)
    } catch (error) {
      toaster.error({ message: 'Failed to save project', description: String(error) })
    }
  }

  const handleTableChange: TableProps<ProjectRecord>['onChange'] = (
    nextPagination,
  ) => {
    setPagination((prev) => ({
      ...prev,
      current: nextPagination.current ?? prev.current,
      pageSize: nextPagination.pageSize ?? prev.pageSize,
    }))
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setPagination((prev) => ({ ...prev, current: 1 }))
  }

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value)
    setPagination((prev) => ({ ...prev, current: 1 }))
  }

  const handleRangeChange = (value: RangeFilter) => {
    setRangeFilter(value)
    setPagination((prev) => ({ ...prev, current: 1 }))
  }

  const closeDetails = () => {
    setIsDetailsOpen(false)
    setSelectedProject(null)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSelectedProject(null)
  }

  const contextValue = {
    projects,
    filteredProjects,
    statusColors: PROJECT_STATUS_COLORS,
    isLoading,
    searchValue: searchTerm,
    statusValue: statusFilter,
    rangeValue: rangeFilter,
    pagination,
    onSearchChange: handleSearchChange,
    onStatusChange: handleStatusChange,
    onRangeChange: handleRangeChange,
    onTableChange: handleTableChange,
    openCreateForm: handleCreateProject,
    openEditForm: handleEditProject,
    openDetails: handleViewProject,
    closeDetails,
    isFormOpen,
    isDetailsOpen,
    formMode,
    selectedProject,
    handleFormSubmit,
    closeForm,
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Projects value={contextValue}>
        <Projects.Header
          title="Active projects"
          subtitle={`Tracking ${projects.length} initiatives`}
        />
        <Projects.Card>
          <Projects.Filters />
          <Projects.Table
            pagination={{
              ...pagination,
              total: pagination.total ?? filteredProjects.length,
            }}
          />
        </Projects.Card>
        <Projects.DetailsModal />
        <Projects.FormModal />
      </Projects>
    </div>
  )
}

