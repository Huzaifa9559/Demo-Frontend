import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  const goTo = (path: string, options?: { query?: Record<string, any>; state?: any }) => {
    const queryString = options?.query ? '?' + new URLSearchParams(options.query).toString() : '';

    navigate(`/${path.replace(/^\/+/, '')}${queryString}`, {
      state: options?.state,
    });
  };

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  const replace = (path: string, params?: Record<string, any>) => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    navigate(`/${path.replace(/^\/+/, '')}${queryString}`, { replace: true });
  };

  return { goTo, goBack, goForward, replace, location, searchParams, setSearchParams, params };
};
