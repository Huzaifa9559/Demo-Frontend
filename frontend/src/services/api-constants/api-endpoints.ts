const PROJECTS_BASE = '/projects';
const AUTH_BASE = '/auth';

export const apiEndpoints = {
  projects: {
    list: `${PROJECTS_BASE}`,
    detail: `${PROJECTS_BASE}/:id`,
    create: `${PROJECTS_BASE}`,
    update: `${PROJECTS_BASE}/:id`,
    delete: `${PROJECTS_BASE}/:id`,
  },
  auth: {
    login: `${AUTH_BASE}/login`,
    signup: `${AUTH_BASE}/signup`,
    me: `${AUTH_BASE}/me`,
    logout: `${AUTH_BASE}/logout`,
    requestOtp: `${AUTH_BASE}/forget-password/request-otp`,
    verifyOtp: `${AUTH_BASE}/forget-password/verify-otp`,
    resetPassword: `${AUTH_BASE}/forget-password/reset`,
  },
};
