import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/services/api-service";
import type {
  RequestOtpCredentials,
  RequestOtpResponse,
  VerifyOtpCredentials,
  VerifyOtpResponse,
  ResetPasswordCredentials,
  ResetPasswordResponse,
} from "@/types/user";
import { apiEndpoints } from "@/services/api-constants";

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: async (credentials: RequestOtpCredentials): Promise<RequestOtpResponse> => {
      const response = await apiService.post<RequestOtpResponse, RequestOtpCredentials>(
        apiEndpoints.auth.requestOtp,
        credentials
      );
      return response;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (credentials: VerifyOtpCredentials): Promise<VerifyOtpResponse> => {
      const response = await apiService.post<VerifyOtpResponse, VerifyOtpCredentials>(
        apiEndpoints.auth.verifyOtp,
        credentials
      );
      return response;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (credentials: ResetPasswordCredentials): Promise<ResetPasswordResponse> => {
      const response = await apiService.post<ResetPasswordResponse, ResetPasswordCredentials>(
        apiEndpoints.auth.resetPassword,
        credentials
      );
      return response;
    },
  });
};


