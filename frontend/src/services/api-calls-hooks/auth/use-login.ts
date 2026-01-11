import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { LOGIN_MUTATION } from '../../mutations';
import type { LoginCredentials, LoginResponse } from '@/types/user';

export const useLogin = () => {
  return useGraphQLMutation<LoginResponse, { input: LoginCredentials }, LoginCredentials>({
    mutation: LOGIN_MUTATION,
    fieldSelector: (data) => (data as { login: LoginResponse }).login,
    inputWrapper: true, // Wraps LoginCredentials in { input: ... }
  });
};

