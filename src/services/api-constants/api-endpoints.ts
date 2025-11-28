const PROJECTS_BASE = '/projects';

export const apiEndpoints = {
  projects: {
    list: `${PROJECTS_BASE}`,
    detail: (id: string) => `${PROJECTS_BASE}/${id}`,
    create: `${PROJECTS_BASE}`,
    update: (id: string) => `${PROJECTS_BASE}/${id}`,
    delete: (id: string) => `${PROJECTS_BASE}/${id}`,
  },
};
