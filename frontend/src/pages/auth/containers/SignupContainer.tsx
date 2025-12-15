import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupForm } from '@hooks';
import { ROUTE_URLS } from '@utils';
import { SignupForm } from '../components/SignupForm';

export const SignupContainer = () => {
  const navigate = useNavigate();
  const { handleSignup, isAuthenticated, isLoading, error } = useSignupForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_URLS.home, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <SignupForm
      onSubmit={handleSignup}
      isLoading={isLoading}
      error={error}
    />
  );
};


