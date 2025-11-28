import { apiEndpoints } from '@services';

export type Flatten<T> = T extends object ? Flatten<T[keyof T]> : T;

export interface API_ERROR_RESPONSE_TYPE {
  details: string;
  message: string;
}
export interface API_BASE_RESPONSE_TYPE<T> {
  success: boolean;
  error: API_ERROR_RESPONSE_TYPE;
  data: T;
}
export type API_ENDPOINTS_TYPE = Flatten<typeof apiEndpoints>;
