import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store';
import { useForgetPasswordForm } from '@hooks';
import { ROUTE_URLS } from '@utils';
import { ForgetPasswordForm } from '../components/ForgetPasswordForm';

export const ForgetPasswordContainer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const {
    handleRequestOtp,
    handleVerifyOtp,
    handleResetPassword,
    isLoading,
    error,
  } = useForgetPasswordForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_URLS.home, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <ForgetPasswordForm
      onRequestOtp={handleRequestOtp}
      onVerifyOtp={handleVerifyOtp}
      onResetPassword={handleResetPassword}
      isLoading={isLoading}
      error={error}
    />
  );
};


