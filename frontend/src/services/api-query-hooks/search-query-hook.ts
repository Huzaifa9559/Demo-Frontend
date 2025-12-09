import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { apiService } from '@services/api-service';
import type { API_ENDPOINTS_TYPE } from '@/types';

export const useSearchQuery = <T>({
  url,
  query,
  key,
  enabled = true,
  minLength = 2,
  delay = 300,
  params = {},
}: {
  url: API_ENDPOINTS_TYPE;
  query: string;
  key: string;
  enabled?: boolean;
  minLength?: number;
  delay?: number;
  params?: Record<string, unknown>;
}) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);
    return () => clearTimeout(handler);
  }, [query, delay]);

  return useQuery<T>({
    queryKey: [key, debouncedQuery],
    queryFn: () =>
      apiService.get<T>(url, {
        params: { ...params, query: debouncedQuery },
      }),
    enabled: enabled && debouncedQuery.length >= minLength,
    refetchOnWindowFocus: false,
  });
};
