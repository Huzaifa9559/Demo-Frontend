import { apiEndpoints } from '@services';
import { SORT_ORDER } from '@utils';

export type Flatten<T> = T extends object ? Flatten<T[keyof T]> : T;

export interface API_ERROR_RESPONSE_TYPE {
  details: string;
  message: string;
}
export interface API_BASE_RESPONSE_TYPE<T> {
  success: boolean;
  data: T;
}
export type API_ENDPOINTS_TYPE = Flatten<typeof apiEndpoints>;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export interface PaginationMeta {
  page: number;
  take: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
