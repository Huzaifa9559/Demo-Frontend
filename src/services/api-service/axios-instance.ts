import axios from "axios";

export const Instance = () => {
  const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor to add auth token
  AxiosInstance.interceptors.request.use(
    (config) => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        try {
          const { token } = JSON.parse(auth);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Failed to parse auth from storage:", error);
        }
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
        localStorage.removeItem("auth");
        // Redirect will be handled by ProtectedRoute
      }
      return Promise.reject(error);
    }
  );

  return AxiosInstance;
};
