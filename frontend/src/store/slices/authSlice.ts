import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginResponse } from "@/types/user";
import { setAuthState, clearAuthState, getAuthState } from "@/utils/functions/auth-storage";

// Initialize from localStorage if available
const initialState: AuthState = getAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
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
      setAuthState(state);
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
      clearAuthState();
    },
  },
});

export const { setCredentials, setLoading, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;

