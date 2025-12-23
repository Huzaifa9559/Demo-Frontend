import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { getAuthToken } from "@/utils/functions/auth-storage";
// Initialize auth state from localStorage
const persistedAuth = getAuthToken();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: persistedAuth,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

