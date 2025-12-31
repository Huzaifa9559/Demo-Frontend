import type { ResourceRecord, ResourceType, ResourceStatus } from "@/types/resource";

export type ResourceListParams = {
  search?: string;
  type?: ResourceType;
  category?: string;
  status?: ResourceStatus;
  tag?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'title' | 'createdAt' | 'type';
  sortOrder?: 'asc' | 'desc';
};

export type CreateResourcePayload = Omit<ResourceRecord, "key" | "createdAt" | "updatedAt">;
export type UpdateResourcePayload = Partial<CreateResourcePayload>;

