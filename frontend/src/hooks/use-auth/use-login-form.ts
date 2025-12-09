import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store";
import { useLogin } from "@/services/api-call-hooks/auth";
import type { LoginCredentials } from "@/types/user";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const loginMutation = useLogin();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await loginMutation.mutateAsync(credentials);
      dispatch(setCredentials(response));
      toast.success(`Welcome back, ${response.user.name}!`);
     
    } catch (error: any) {
      const errorMessage = error?.message || "Invalid email or password. Please try again.";
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

