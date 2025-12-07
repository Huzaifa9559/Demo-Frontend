const PROJECTS_BASE = '/projects';
const AUTH_BASE = '/auth';

export const apiEndpoints = {
  projects: {
    list: `${PROJECTS_BASE}`,
    detail: (id: string) => `${PROJECTS_BASE}/${id}`,
    create: `${PROJECTS_BASE}`,
    update: (id: string) => `${PROJECTS_BASE}/${id}`,
    delete: (id: string) => `${PROJECTS_BASE}/${id}`,
  },
  auth: {
    login: `${AUTH_BASE}/login`,
    me: `${AUTH_BASE}/me`,
    logout: `${AUTH_BASE}/logout`,
  },
};
