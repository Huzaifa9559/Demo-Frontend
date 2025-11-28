import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@services/api-service';
import type { API_ENDPOINTS_TYPE } from '@/types';
import type {
  InvalidateQueryFilters,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

const isUrlFunction = <D>(
  url: API_ENDPOINTS_TYPE | ((data: D) => string)
): url is (data: D) => string => typeof url === 'function';

export const resolveHeaders = <D>(
  headers: Record<string, string> | ((data: D) => Record<string, string>),
  data: D
): Record<string, string> => {
  return typeof headers === 'function' ? headers(data) : headers;
};

export const useGetQuery = <T>({
  key,
  url,
  params = {},
  options = {},
  headers = {},
}: {
  key: string | unknown[];
  url: API_ENDPOINTS_TYPE;
  params?: Record<string, unknown>;
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>;
  headers?: Record<string, string>;
}) => {
  const queryKey = Array.isArray(key) ? key : [key];

  return useQuery<T>({
    queryKey,
    queryFn: () => apiService.get<T>(url, { params, headers }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });
};

export const usePostMutation = <T, D>({
  url,
  keyToInvalidate,
  options,
  headers = {},
}: {
  url: API_ENDPOINTS_TYPE | ((data: D) => string) | string;
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>;
  headers?: Record<string, string> | ((data: D) => Record<string, string>);
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, D>({
    mutationFn: (data) => {
      const resolvedUrl = isUrlFunction<D>(url) ? url(data) : url;
      const resolvedHeaders = resolveHeaders(headers, data);
      return apiService.post<T, D>(resolvedUrl, data, { headers: resolvedHeaders });
    },
    onSuccess: () => {
      if (keyToInvalidate) queryClient.invalidateQueries(keyToInvalidate);
    },
    ...options,
  });
};

export const usePutMutation = <T, D>({
  url,
  keyToInvalidate,
  options,
  headers = {},
}: {
  url: API_ENDPOINTS_TYPE | ((data: D) => string) | string;
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>;
  headers?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, D>({
    mutationFn: (data) => {
      const resolvedUrl = isUrlFunction<D>(url) ? url(data) : url;
      return apiService.put<T, D>(resolvedUrl, data, { headers });
    },
    onSuccess: () => {
      if (keyToInvalidate) queryClient.invalidateQueries(keyToInvalidate);
    },
    ...options,
  });
};

export const usePatchMutation = <T, D>({
  url,
  keyToInvalidate,
  options,
  headers = {},
}: {
  url: API_ENDPOINTS_TYPE | ((data: D) => string) | string;
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>;
  headers?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, D>({
    mutationFn: (data) => {
      const resolvedUrl = isUrlFunction<D>(url) ? url(data) : url;
      return apiService.patch<T, D>(resolvedUrl, data, { headers });
    },
    onSuccess: () => {
      if (keyToInvalidate) queryClient.invalidateQueries(keyToInvalidate);
    },
    ...options,
  });
};

export const useDeleteMutation = <T>({
  url,
  keyToInvalidate,
  options,
  headers = {},
}: {
  url: API_ENDPOINTS_TYPE;
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, string>, 'mutationFn'>;
  headers?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, string>({
    mutationFn: (id) => apiService.delete<T>(`${url}/${id}`, headers),
    onSuccess: () => {
      if (keyToInvalidate) queryClient.invalidateQueries(keyToInvalidate);
    },
    ...options,
  });
};

export const usePaginationQuery = <T>({
  key,
  url,
  params = {},
  options = {},
  headers = {},
}: {
  key: string | unknown[];
  url: API_ENDPOINTS_TYPE;
  params?: Record<string, any>;
  options?: Record<string, any>;
  headers?: Record<string, string>;
}) => {
  return useQuery<T>({
    queryKey: [
      ...(Array.isArray(key) ? key : [key]),
      ...(Object.keys(params).length > 0 ? [params] : []),
    ],
    queryFn: () => apiService.get<T>(url, { params, headers }),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });
};

export const useUploadFileMutation = <T = { url: string; id: string }>({
  url,
  onError,
  onSuccess,
  setUploadProgress,
  options,
}: {
  url: API_ENDPOINTS_TYPE;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  setUploadProgress?: (progress: number) => void;
  options?: Omit<UseMutationOptions<T, Error, FormData>, 'mutationFn' | 'onSuccess' | 'onError'>;
  isAuthenticated?: boolean;
}) => {
  return useMutation<T, Error, FormData>({
    mutationFn: async (file: FormData) => {
      return apiService.post<T, FormData>(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onMutate: () => setUploadProgress?.(0),
    onSuccess,
    onError,
    ...options,
  });
};
