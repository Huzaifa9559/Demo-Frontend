import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { RESET_PASSWORD_MUTATION } from '../../mutations';
import type { ResetPasswordCredentials, ResetPasswordResponse } from '@/types/user';

export const useResetPassword = () => {
  return useGraphQLMutation<ResetPasswordResponse, { input: ResetPasswordCredentials }, ResetPasswordCredentials>({
    mutation: RESET_PASSWORD_MUTATION,
    fieldSelector: (data) => (data as { resetPassword: ResetPasswordResponse }).resetPassword,
    inputWrapper: true,
  });
};
