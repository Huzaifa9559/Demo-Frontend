export interface ApiErrorResponse {
  message: string;
  details?: string;
}

export interface ApiBaseResponse<T> {
  success: boolean;
  error: ApiErrorResponse | null;
  data: T | null;
}

export function buildSuccessResponse<T>(
  data: T,
  message?: string,
): ApiBaseResponse<T> {
  return {
    success: true,
    error: null,
    data,
  };
}

export function buildErrorResponse(
  message: string,
  details?: string,
): ApiBaseResponse<null> {
  return {
    success: false,
    error: { message, details },
    data: null,
  };
}

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

export function buildPaginationMeta(
  page: number,
  take: number,
  totalItems: number,
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / take);
  return {
    page,
    take,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

