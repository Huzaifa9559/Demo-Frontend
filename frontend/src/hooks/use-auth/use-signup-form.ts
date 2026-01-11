import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store";
import { useSignup } from "@/services/graphql/hooks";
import { getErrorMessage } from "@utils";
import type { SignupCredentials } from "@/types/user";

export const useSignupForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated = false } = authState || {};
  const signupMutation = useSignup();

  const handleSignup = async (credentials: SignupCredentials) => {
    // Default role to 'user' if not provided
    const signupData = {
      ...credentials,
      role: 'user' as const,
    };
    
    const result = await signupMutation.mutateAsync(signupData);
    
    if (result.success) {
      dispatch(setCredentials(result.data));
      toast.success(`Welcome, ${result.data.user.name}! Account created successfully.`);
    } else {
      toast.error(result.error.message || "Failed to create account. Please try again.");
    }
  };

  return {
    handleSignup,
    isAuthenticated,
    isLoading: signupMutation.isPending,
    error: signupMutation.error?.message || null,
  };
};


