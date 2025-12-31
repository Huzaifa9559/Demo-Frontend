import { AuthState } from "@/types/user";

const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";
const AUTH_STATE_KEY = "authState";

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}


export function getAuthState(): AuthState {
  const storedState = localStorage.getItem(AUTH_STATE_KEY);
  if (storedState) {
    try {
      return JSON.parse(storedState) as AuthState;
    } catch {
      // Fallback to reconstructing from individual keys if stored state is invalid
      const token = getAuthToken();
      const user = localStorage.getItem(AUTH_USER_KEY);
      return {
        user: user ? JSON.parse(user) : null,
        token: token,
        isAuthenticated: !!token,
        isLoading: false,
        error: null,
      };
    }
  }
  
  // If no stored state, reconstruct from individual keys
  const token = getAuthToken();
  const user = localStorage.getItem(AUTH_USER_KEY);
  return {
    user: user ? JSON.parse(user) : null,
    token: token,
    isAuthenticated: !!token,
    isLoading: false,
    error: null,
  };
}

export function setAuthState(state: AuthState): void {
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
  // Also store individual keys for backward compatibility
  if (state.token) {
    setAuthToken(state.token);
  }
  if (state.user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(state.user));
  }
}

export function clearAuthState(): void {
  localStorage.removeItem(AUTH_STATE_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  clearAuthToken();
}