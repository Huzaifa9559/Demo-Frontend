import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@services/api-service';
import type { API_ENDPOINTS_TYPE } from '@/types';
import type {
  InvalidateQueryFilters,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

const buildUrl = <U>(url: API_ENDPOINTS_TYPE | ((id: U) => string), id?: U): string => {
  if (typeof url === 'function') {
    return url(id as U);
  }
  if (typeof url === 'string' && id) {
    return url.replace(':id', String(id));
  }
  return url as string;
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
    queryFn: async (): Promise<T> => {
      const result = await apiService.get<T>(url, { params, headers });
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
    },
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
  url: API_ENDPOINTS_TYPE;
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, D>, 'mutationFn'>;
  headers?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, D>({
    mutationFn: async (data: D): Promise<T> => {
      const result = await apiService.post<T, D>(url, data, { headers });
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
    },
    onSuccess: () => {
      if (keyToInvalidate) queryClient.invalidateQueries(keyToInvalidate);
    },
    ...options,
  });
};

export const usePutMutation = <T, D, U = string>({
  url,
  keyToInvalidate,
  options,
  headers = {},
}: {
  url: API_ENDPOINTS_TYPE | ((id: U) => string);
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, { payload: D, id?: U }>, 'mutationFn'>;
  headers?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, { payload: D, id?: U }>({
    mutationFn: async ({ payload, id }: { payload: D, id?: U }): Promise<T> => {
      const finalUrl = buildUrl(url, id);
      const result = await apiService.put<T, D>(finalUrl, payload, { headers });
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
    },
    onSuccess: () => {
      if (keyToInvalidate) queryClient.invalidateQueries(keyToInvalidate);
    },
    ...options,
  });
};

export const usePatchMutation = <T, D, U = string>({
  url,
  keyToInvalidate,
  options,
  headers = {},
}: {
  url: API_ENDPOINTS_TYPE | ((id: U) => string);
  keyToInvalidate?: InvalidateQueryFilters;
  options?: Omit<UseMutationOptions<T, Error, { payload: D, id?: U }>, 'mutationFn'>;
  headers?: Record<string, string>;
}) => {
  const queryClient = useQueryClient();
  return useMutation<T, Error, { payload: D, id?: U }>({
    mutationFn: async ({ payload, id }: { payload: D, id?: U }): Promise<T> => {
      const finalUrl = buildUrl(url, id);
      const result = await apiService.patch<T, D>(finalUrl, payload, { headers });
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
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
    mutationFn: async (id: string): Promise<T> => {
      const result = await apiService.delete<T>(`${url}/${id}`, headers);
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
    },
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
    queryFn: async (): Promise<T> => {
      const result = await apiService.get<T>(url, { params, headers });
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
    },
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
    mutationFn: async (file: FormData): Promise<T> => {
      const result = await apiService.post<T, FormData>(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result.success) {
        return result.data!;
      }
      throw new Error(result.error?.message ?? "An error occurred");
    },
    onMutate: () => setUploadProgress?.(0),
    onSuccess,
    onError,
    ...options,
  });
};
