import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { REQUEST_OTP_MUTATION } from '../../mutations';
import type { RequestOtpCredentials, RequestOtpResponse } from '@/types/user';

export const useRequestOtp = () => {
  return useGraphQLMutation<RequestOtpResponse, { input: RequestOtpCredentials }, RequestOtpCredentials>({
    mutation: REQUEST_OTP_MUTATION,
    fieldSelector: (data) => (data as { requestOtp: RequestOtpResponse }).requestOtp,
    inputWrapper: true,
  });
};
