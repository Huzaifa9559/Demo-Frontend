import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials, setLoading, setError } from "@/store";
import { useLogin } from "@/services/api-call-hooks/auth";
import { ROUTE_URLS } from "@utils";
import type { LoginCredentials } from "@/types/user";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);
  const loginMutation = useLogin();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await loginMutation.mutateAsync(credentials);

      // Store credentials in Redux
      dispatch(setCredentials(response));
      dispatch(setLoading(false));

      toast.success(`Welcome back, ${response.user.name}!`);
      navigate(ROUTE_URLS.home, { replace: true });
    } catch (error: any) {
      const errorMessage = error?.message || "Invalid email or password. Please try again.";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

  return {
    handleLogin,
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error,
  };
};

