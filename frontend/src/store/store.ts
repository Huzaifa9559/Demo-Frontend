import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { getAuth } from "@/utils/functions";

// Initialize auth state from localStorage
const persistedAuth = getAuth();

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

