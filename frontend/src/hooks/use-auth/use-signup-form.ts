import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store";
import { useSignup } from "@/services/api-call-hooks/auth";
import { getErrorMessage } from "@utils";
import type { SignupCredentials } from "@/types/user";

export const useSignupForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated = false } = authState || {};
  const signupMutation = useSignup();

  const handleSignup = async (credentials: SignupCredentials) => {
    try {
      const response = await signupMutation.mutateAsync(credentials);
      dispatch(setCredentials(response));
      toast.success(`Welcome, ${response.user.name}! Account created successfully.`);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error) || "Failed to create account. Please try again.";
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


