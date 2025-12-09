import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/services/api-service";
import type { LoginCredentials, LoginResponse } from "@/types/user";
import { apiEndpoints } from "@/services/api-constants";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await apiService.post<LoginResponse, LoginCredentials>(
        apiEndpoints.auth.login,
        credentials
      );
      return response;
    },
  });
};

