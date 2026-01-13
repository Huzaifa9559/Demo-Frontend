import { Space, Tag, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { memo } from 'react';
import type { ResourceTypeFilter, ResourceStatusFilter } from '@/types/resource';
import { RESOURCE_TYPE_OPTIONS, RESOURCE_STATUS_OPTIONS } from '@/types/resource';

const { Search } = Input;

type ResourceQuickFiltersProps = {
  search: string;
  typeFilter: ResourceTypeFilter;
  statusFilter: ResourceStatusFilter;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (type: ResourceTypeFilter) => void;
  onStatusFilterChange: (status: ResourceStatusFilter) => void;
};

export const ResourceQuickFilters = memo(({
  search,
  typeFilter,
  statusFilter,
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange,
}: ResourceQuickFiltersProps) => {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Search
        placeholder="Search resources..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={onSearchChange}
      />

      <Space wrap>
        <span className="text-sm font-medium">Type:</span>
        {RESOURCE_TYPE_OPTIONS.map((option) => (
          <Tag
            key={option.value}
            color={typeFilter === option.value ? 'blue' : 'default'}
            className="cursor-pointer"
            onClick={() => onTypeFilterChange(option.value as ResourceTypeFilter)}
          >
            {option.label}
          </Tag>
        ))}
      </Space>

      <Space wrap>
        <span className="text-sm font-medium">Status:</span>
        {RESOURCE_STATUS_OPTIONS.map((option) => (
          <Tag
            key={option.value}
            color={statusFilter === option.value ? 'green' : 'default'}
            className="cursor-pointer"
            onClick={() => onStatusFilterChange(option.value as ResourceStatusFilter)}
          >
            {option.label}
          </Tag>
        ))}
      </Space>
    </Space>
  );
});

ResourceQuickFilters.displayName = 'ResourceQuickFilters';

