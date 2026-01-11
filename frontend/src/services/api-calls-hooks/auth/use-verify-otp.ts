import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { VERIFY_OTP_MUTATION } from '../../mutations';
import type { VerifyOtpCredentials, VerifyOtpResponse } from '@/types/user';

export const useVerifyOtp = () => {
  return useGraphQLMutation<VerifyOtpResponse, { input: VerifyOtpCredentials }, VerifyOtpCredentials>({
    mutation: VERIFY_OTP_MUTATION,
    fieldSelector: (data) => (data as { verifyOtp: VerifyOtpResponse }).verifyOtp,
    inputWrapper: true,
  });
};
