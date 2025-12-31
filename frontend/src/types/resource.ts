export type ResourceType = 'document' | 'link' | 'file' | 'video' | 'image' | 'other';
export type ResourceStatus = 'active' | 'archived';

export type ResourceRecord = {
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
};

export type ResourceTypeFilter = 'all' | ResourceType;
export type ResourceStatusFilter = 'all' | ResourceStatus;

export const RESOURCE_TYPE_OPTIONS = [
  { label: 'All Types', value: 'all' },
  { label: 'Document', value: 'document' },
  { label: 'Link', value: 'link' },
  { label: 'File', value: 'file' },
  { label: 'Video', value: 'video' },
  { label: 'Image', value: 'image' },
  { label: 'Other', value: 'other' },
] as const;

export const RESOURCE_STATUS_OPTIONS = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
] as const;

export const RESOURCE_TYPE_COLORS: Record<ResourceType, string> = {
  document: 'blue',
  link: 'green',
  file: 'purple',
  video: 'red',
  image: 'orange',
  other: 'default',
};

export const RESOURCE_TYPE_ICONS: Record<ResourceType, string> = {
  document: '📄',
  link: '🔗',
  file: '📎',
  video: '🎥',
  image: '🖼️',
  other: '📦',
};

