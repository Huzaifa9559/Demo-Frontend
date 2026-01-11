import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { SIGNUP_MUTATION } from '../../mutations';
import type { SignupCredentials, SignupResponse } from '@/types/user';

export const useSignup = () => {
  return useGraphQLMutation<
    SignupResponse,
    { input: SignupCredentials & { role: string } },
    SignupCredentials & { role: string }
  >({
    mutation: SIGNUP_MUTATION,
    fieldSelector: (data) => (data as { signup: SignupResponse }).signup,
    inputWrapper: true, // Wraps SignupCredentials in { input: ... }
  });
};

