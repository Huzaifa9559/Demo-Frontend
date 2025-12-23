import type {
  RequestOtpCredentials,
  RequestOtpResponse,
  VerifyOtpCredentials,
  VerifyOtpResponse,
  ResetPasswordCredentials,
  ResetPasswordResponse,
} from "@/types/user";
import { apiEndpoints } from "@/services/api-constants";
import { usePostMutation } from "@/services/api-query-hooks";

export const useRequestOtp = () => {
  return usePostMutation<RequestOtpResponse, RequestOtpCredentials>({
    url: apiEndpoints.auth.requestOtp,
  });
};

export const useVerifyOtp = () => {
  return usePostMutation<VerifyOtpResponse, VerifyOtpCredentials>({
    url: apiEndpoints.auth.verifyOtp,
    });
};

export const useResetPassword = () => {
  return usePostMutation<ResetPasswordResponse, ResetPasswordCredentials>({
    url: apiEndpoints.auth.resetPassword,
    });
};


