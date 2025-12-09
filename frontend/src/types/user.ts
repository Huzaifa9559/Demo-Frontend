export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface AuthState {
  user: Omit<User, 'password'> | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

