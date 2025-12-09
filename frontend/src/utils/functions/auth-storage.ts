/**
 * Authentication Utilities
 * 
 * Handles authentication token and user storage and retrieval
 */

import type { LoginResponse, AuthState } from "@/types/user";

const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";

/**
 * Get authentication token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get user data from localStorage
 */
export function getAuthUser(): Omit<import("@/types/user").User, "password"> | null {
  if (typeof window === "undefined") return null;
  
  try {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Failed to parse user from storage:", error);
    return null;
  }
}

/**
 * Get complete auth state from localStorage
 * @returns AuthState with loaded data or initial state if not found/invalid
 */
export function getAuth(): AuthState {
  const token = getAuthToken();
  const user = getAuthUser();
  
  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
  };
}

/**
 * Set authentication token and user in localStorage
 * @param authData - LoginResponse containing user and token
 */
export function setAuth(authData: LoginResponse): void {
  if (typeof window === "undefined") return;
  
  try {
    // Store token directly as string (no JSON needed)
    localStorage.setItem(AUTH_TOKEN_KEY, authData.token);
    
    // Store user as JSON (since it's an object with multiple properties)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authData.user));
  } catch (error) {
    console.error("Failed to save auth to storage:", error);
  }
}

/**
 * Set authentication token only (legacy support)
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Remove authentication data from localStorage
 */
export function removeAuth(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  removeAuth();
}

