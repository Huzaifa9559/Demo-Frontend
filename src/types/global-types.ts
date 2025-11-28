import { SORT_ORDER } from '@utils';

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
