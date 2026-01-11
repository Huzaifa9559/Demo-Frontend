import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store";
import { useLogin } from "@services";
import type { LoginCredentials } from "@/types/user";

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated = false } = authState || {};
  const loginMutation = useLogin();

  const handleLogin = async (credentials: LoginCredentials) => {
    const result = await loginMutation.mutateAsync(credentials);
    
    if (result.success) {
      dispatch(setCredentials(result.data));
      toast.success(`Welcome back, ${result.data.user.name}!`);
    } else {
      toast.error(result.error.message || "Invalid email or password. Please try again.");
    }
  };

  return {
    handleLogin,
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null,
  };
};

