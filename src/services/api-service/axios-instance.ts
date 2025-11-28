import axios from "axios";

export const Instance = () => {
  const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
    headers: { "Content-Type": "application/json" },
  });

  AxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );

  return AxiosInstance;
};
