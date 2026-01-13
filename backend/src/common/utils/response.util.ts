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
