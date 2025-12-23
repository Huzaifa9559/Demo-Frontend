import type { LoginCredentials, LoginResponse } from "@/types/user";
import { apiEndpoints } from "@/services/api-constants";
import { usePostMutation } from "@/services/api-query-hooks";

export const useLogin = () => {
  return usePostMutation<LoginResponse, LoginCredentials>({
    url: apiEndpoints.auth.login,
  });
};
