import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from '@hooks';
import { ROUTE_URLS } from '@utils';
import { LoginForm } from '../presentations/LoginForm';

export const LoginContainer = () => {
  const navigate = useNavigate();
  const { handleLogin, isAuthenticated, isLoading, error } = useLoginForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_URLS.home, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginForm
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
    />
  );
};

