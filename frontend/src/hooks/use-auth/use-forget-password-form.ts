import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useRequestOtp, useVerifyOtp, useResetPassword } from "@/services/api-call-hooks/auth";
import { getErrorMessage, ROUTE_URLS } from "@utils";

export const useForgetPasswordForm = () => {
  const navigate = useNavigate();
  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();
  const resetPasswordMutation = useResetPassword();

  const handleRequestOtp = async (email: string) => {
    try {
      const response = await requestOtpMutation.mutateAsync({ email });
      toast.success(response.message || "OTP has been sent to your email address");
      if (import.meta.env.DEV && response.otp) {
        toast.info(`Development OTP: ${response.otp}`, { duration: 10000 });
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error) || "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleVerifyOtp = async (email: string, otp: string) => {
    try {
      const response = await verifyOtpMutation.mutateAsync({ email, otp });
      toast.success(response.message || "OTP verified successfully");
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error) || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleResetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      const response = await resetPasswordMutation.mutateAsync({ email, otp, newPassword });
      toast.success(response.message || "Password has been reset successfully");
      navigate(ROUTE_URLS.login);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error) || "Failed to reset password. Please try again.";
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    handleRequestOtp,
    handleVerifyOtp,
    handleResetPassword,
    isLoading: requestOtpMutation.isPending || verifyOtpMutation.isPending || resetPasswordMutation.isPending,
    error: requestOtpMutation.error?.message || verifyOtpMutation.error?.message || resetPasswordMutation.error?.message || null,
  };
};


