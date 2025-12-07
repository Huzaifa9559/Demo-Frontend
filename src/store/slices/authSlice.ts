import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, LoginResponse } from "@/types/user";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Load from localStorage on init
const loadAuthFromStorage = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      return {
        user: parsed.user,
        token: parsed.token,
        isAuthenticated: !!parsed.token,
        isLoading: false,
        error: null,
      };
    }
  } catch (error) {
    console.error("Failed to load auth from storage:", error);
  }
  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthFromStorage(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<LoginResponse>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      // Persist to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, setLoading, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;

