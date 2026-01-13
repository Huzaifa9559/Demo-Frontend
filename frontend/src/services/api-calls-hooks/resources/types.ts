import type { ResourceType, ResourceStatus } from '@/types/resource';

export type CreateResourcePayload = {
  title: string;
  description?: string;
  type: ResourceType;
  category?: string;
  url: string;
  tags?: string[];
  status?: ResourceStatus;
  author?: string;
};

export type UpdateResourcePayload = Partial<CreateResourcePayload>;

export type ResourcesQueryParams = {
  search?: string;
  type?: ResourceType;
  status?: ResourceStatus;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'title' | 'createdAt' | 'type';
  sortOrder?: 'asc' | 'desc';
};

export type ResourcesResponse = {
  data: Array<{
    key: string;
    title: string;
    description: string | null;
    type: ResourceType;
    category: string | null;
    url: string;
    tags: string[];
    status: ResourceStatus;
    author: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  meta: {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};
