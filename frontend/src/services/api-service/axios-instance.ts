import axios from "axios";
import { getAuthToken, removeAuth } from "@/utils/functions";

export const Instance = () => {
  const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor to add auth token
  AxiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle 401 unauthorized - clear auth and redirect to login
      if (error.response?.status === 401) {
        removeAuth();
        // Redirect will be handled by ProtectedRoute
      }
      return Promise.reject(error);
    }
  );

  return AxiosInstance;
};
