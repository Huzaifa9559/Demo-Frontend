import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/services/api-service";
import type { SignupCredentials, SignupResponse } from "@/types/user";
import { apiEndpoints } from "@/services/api-constants";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (credentials: SignupCredentials): Promise<SignupResponse> => {
      const response = await apiService.post<SignupResponse, SignupCredentials>(
        apiEndpoints.auth.signup,
        credentials
      );
      return response;
    },
  });
};


