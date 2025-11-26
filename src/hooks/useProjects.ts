import { QUERY_KEYS } from '@constants/api'
import { projectService } from '@services/projectService'
import type { ProjectRecord } from '@data/projects'
import {
  useListQuery,
  useDetailQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  type ServiceFunctions,
} from './common'

type ProjectListParams = {
  search?: string
  status?: string
  range?: string
}

type CreateProjectPayload = Omit<ProjectRecord, 'key'>
type UpdateProjectPayload = Partial<Omit<ProjectRecord, 'key'>>

export const useProjects = (params?: ProjectListParams) => {
  return useListQuery<ProjectRecord, ProjectListParams>(
    projectService,
    QUERY_KEYS.projects,
    { params },
  )
}

export const useProject = (id: string | null) => {
  return useDetailQuery<ProjectRecord>(projectService, QUERY_KEYS.projects, {
    id,
  })
}

export const useCreateProject = () => {
  return useCreateMutation<ProjectRecord, CreateProjectPayload>(
    projectService,
    QUERY_KEYS.projects,
  )
}

export const useUpdateProject = () => {
  return useUpdateMutation<ProjectRecord, UpdateProjectPayload>(
    projectService,
    QUERY_KEYS.projects,
  )
}

export const useDeleteProject = () => {
  return useDeleteMutation<ProjectRecord>(
    projectService as ServiceFunctions<ProjectRecord, any, any, any>,
    QUERY_KEYS.projects,
  )
}

