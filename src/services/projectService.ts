import { PROJECT_ROWS, type ProjectRecord } from '@data/projects'

type ProjectListParams = {
  search?: string
  status?: string
  range?: string
}

type CreateProjectPayload = Omit<ProjectRecord, 'key'>
type UpdateProjectPayload = Partial<Omit<ProjectRecord, 'key'>>

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Storage key for persisting mock projects data
const STORAGE_KEY = 'MOCK_PROJECTS_DATA'

// Load projects from localStorage or use initial data
const loadProjectsFromStorage = (): ProjectRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as ProjectRecord[]
    }
  } catch (error) {
    console.warn('Failed to load projects from localStorage:', error)
  }
  return [...PROJECT_ROWS]
}

// Save projects to localStorage
const saveProjectsToStorage = (projects: ProjectRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.warn('Failed to save projects to localStorage:', error)
  }
}

let mockProjects: ProjectRecord[] = loadProjectsFromStorage()

export const projectService = {
  async list(_params?: ProjectListParams): Promise<ProjectRecord[]> {
    await delay(500)
    return Promise.resolve([...mockProjects])
  },

  async getById(id: string): Promise<ProjectRecord> {
    await delay(300)
    const project = mockProjects.find((p) => p.key === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return Promise.resolve({ ...project })
  },

  async create(payload: CreateProjectPayload): Promise<ProjectRecord> {
    await delay(400)
    const key =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}`
    const newProject: ProjectRecord = { key, ...payload }
    mockProjects = [newProject, ...mockProjects]
    saveProjectsToStorage(mockProjects)
    return Promise.resolve({ ...newProject })
  },

  async update(id: string, payload: UpdateProjectPayload): Promise<ProjectRecord> {
    await delay(400)
    const index = mockProjects.findIndex((p) => p.key === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    mockProjects[index] = { ...mockProjects[index], ...payload }
    saveProjectsToStorage(mockProjects)
    return Promise.resolve({ ...mockProjects[index] })
  },

  async delete(id: string): Promise<void> {
    await delay(300)
    const index = mockProjects.findIndex((p) => p.key === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    mockProjects = mockProjects.filter((p) => p.key !== id)
    saveProjectsToStorage(mockProjects)
    return Promise.resolve()
  },
}

