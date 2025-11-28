import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTP_STATUS_CODES, SOMETHING_WENT_WRONG, UNABLE_TO_FIND } from '@utils';
import { Instance } from './axios-instance';

const AxiosInstance = Instance();

const processFailedRequest = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error?.response?.data?.message;
    if (status === HTTP_STATUS_CODES.CONFLICT) {
      throw new Error(serverMessage || SOMETHING_WENT_WRONG);
    } else throw new Error(serverMessage || UNABLE_TO_FIND);
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
