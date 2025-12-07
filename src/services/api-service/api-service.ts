import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTP_STATUS_CODES, SOMETHING_WENT_WRONG, UNABLE_TO_FIND } from '@utils';
import { Instance } from './axios-instance';

const AxiosInstance = Instance();

const processFailedRequest = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    
    // Try to get error message from different possible fields
    const serverMessage = 
      responseData?.message || 
      responseData?.error || 
      responseData?.errorMessage;
    
    // Handle specific status codes with professional messages
    if (status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      throw new Error(serverMessage || "Your session has expired or you don't have permission to access this resource. Please log in again.");
    }
    
    if (status === HTTP_STATUS_CODES.FORBIDDEN) {
      throw new Error(serverMessage || "You don't have permission to perform this action.");
    }
    
    if (status === HTTP_STATUS_CODES.NOT_FOUND) {
      throw new Error(serverMessage || "The requested resource could not be found.");
    }
    
    if (status === HTTP_STATUS_CODES.CONFLICT) {
      throw new Error(serverMessage || "A conflict occurred. The resource may have been modified by another user.");
    }
    
    if (status === HTTP_STATUS_CODES.BAD_REQUEST) {
      throw new Error(serverMessage || "Invalid request. Please check your input and try again.");
    }
    
    if (status === HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
      throw new Error(serverMessage || "A server error occurred. Please try again later.");
    }
    
    // Default error message
    throw new Error(serverMessage || SOMETHING_WENT_WRONG);
  }

  throw new Error(SOMETHING_WENT_WRONG);
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
  get: async <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await AxiosInstance.get(url, options);
      return unwrapResponse<T>(response);
    } catch (error: any) {
      return processFailedRequest(error);
    }
  },

  post: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await AxiosInstance.post(url, data, config);
      return unwrapResponse<T>(response);
    } catch (error: any) {
      return processFailedRequest(error);
    }
  },

  put: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await AxiosInstance.put(url, data, config);
      return unwrapResponse<T>(response);
    } catch (error: any) {
      return processFailedRequest(error);
    }
  },

  patch: async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await AxiosInstance.patch(url, data, config);
      return unwrapResponse<T>(response);
    } catch (error: any) {
      return processFailedRequest(error);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await AxiosInstance.delete(url, config);
      return unwrapResponse<T>(response);
    } catch (error: any) {
      return processFailedRequest(error);
    }
  },
};

export default apiService;
