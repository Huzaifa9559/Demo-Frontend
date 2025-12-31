import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store";
import { useLogin } from "@/services/api-call-hooks/auth";
import { getErrorMessage } from "@utils";
import type { LoginCredentials } from "@/types/user";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated = false } = authState || {};
  const loginMutation = useLogin();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await loginMutation.mutateAsync(credentials);
      dispatch(setCredentials(response));
      toast.success(`Welcome back, ${response.user.name}!`);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error) || "Invalid email or password. Please try again.";
      toast.error(errorMessage);
    }
  };

  return {
    handleLogin,
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null,
  };
};

