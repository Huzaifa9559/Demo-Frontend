
import type { SignupCredentials, SignupResponse } from "@/types/user";
import { apiEndpoints } from "@/services/api-constants";
import { usePostMutation } from "@/services/api-query-hooks";

export const useSignup = () => {
    return usePostMutation<SignupResponse, SignupCredentials>({
      url: apiEndpoints.auth.signup,
  });
};


