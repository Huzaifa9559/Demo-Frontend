import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SOMETHING_WENT_WRONG } from '@utils';
import { Instance } from './axios-instance';

const AxiosInstance = Instance();

export type ApiResult<T> = 
  | { success: boolean; data?: T; error?: { message: string; status?: number } }

const processFailedRequest = <T>(error: unknown): ApiResult<T> => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    
    // Try to get error message from different possible fields
    const serverMessage = 
      responseData?.error?.message ||
      responseData?.message || 
      (typeof responseData?.error === "string" ? responseData.error : null) ||
      responseData?.errorMessage ||
      error.message ||
      SOMETHING_WENT_WRONG;
    
    return {
      success: false,
      error: {
        message: serverMessage,
        status,
      },
    };
  }

  return {
    success: false,
    error: {
      message: error instanceof Error ? error.message : SOMETHING_WENT_WRONG,
    },
  };
};

const unwrapResponse = <T>(response: AxiosResponse<any>): T => {
  const resData = response.data;

  if (resData && typeof resData === 'object' && 'meta' in resData && 'data' in resData) {
    return resData as T;
  }

  if ('data' in resData) {
    return resData.data as T;
  }

  return resData as T;
};

export const apiService = {
  get: async <T>(url: string, options?: AxiosRequestConfig): Promise<ApiResult<T>> => {
    try {
      const response = await AxiosInstance.get(url, options);
      const data = unwrapResponse<T>(response);
      return { success: true, data };
    } catch (error: any) {
      return processFailedRequest<T>(error);
    }
  },

  post: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResult<T>> => {
    try {
      const response = await AxiosInstance.post(url, data, config);
      const result = unwrapResponse<T>(response);
      return { success: true, data: result };
    } catch (error: any) {
      return processFailedRequest<T>(error);
    }
  },

  put: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResult<T>> => {
    try {
      const response = await AxiosInstance.put(url, data, config);
      const result = unwrapResponse<T>(response);
      return { success: true, data: result };
    } catch (error: any) {
      return processFailedRequest<T>(error);
    }
  },

  patch: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<ApiResult<T>> => {
    try {
      const response = await AxiosInstance.patch(url, data, config);
      const result = unwrapResponse<T>(response);
      return { success: true, data: result };
    } catch (error: any) {
      return processFailedRequest<T>(error);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>> => {
    try {
      const response = await AxiosInstance.delete(url, config);
      const result = unwrapResponse<T>(response);
      return { success: true, data: result };
    } catch (error: any) {
      return processFailedRequest<T>(error);
    }
  },
};

export default apiService;
