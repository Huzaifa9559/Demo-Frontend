import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store";
import { useSignup } from "@/services/api-call-hooks/auth";
import type { SignupCredentials } from "@/types/user";

export const useSignupForm = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const signupMutation = useSignup();

  const handleSignup = async (credentials: SignupCredentials) => {
    try {
      const response = await signupMutation.mutateAsync(credentials);
      dispatch(setCredentials(response));
      toast.success(`Welcome, ${response.user.name}! Account created successfully.`);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error || error?.message || "Failed to create account. Please try again.";
      toast.error(errorMessage);
    }
  };

  return {
    handleSignup,
    isAuthenticated,
    isLoading: signupMutation.isPending,
    error: signupMutation.error?.message || null,
  };
};


