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

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  user: Omit<User, 'password'>;
  token: string;
}

export interface RequestOtpCredentials {
  email: string;
}

export interface RequestOtpResponse {
  message: string;
  otp?: string; // Only in development
}

export interface VerifyOtpCredentials {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
}

export interface ResetPasswordCredentials {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

