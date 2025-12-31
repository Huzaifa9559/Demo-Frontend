import { Space, Input, Select, Button } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ResourceTypeFilter, ResourceStatusFilter } from '@/types/resource';
import { RESOURCE_TYPE_OPTIONS, RESOURCE_STATUS_OPTIONS } from '@/types/resource';

const { Search } = Input;

type FilterValues = {
  search: string;
  type: ResourceTypeFilter;
  status: ResourceStatusFilter;
  category: string;
};

type ResourceFiltersProps = {
  filters: FilterValues;
  onFilterChange: (key: keyof FilterValues, value: string) => void;
  onReset: () => void;
  categories?: string[];
};

export const ResourceFilters = ({
  filters,
  onFilterChange,
  onReset,
  categories = [],
}: ResourceFiltersProps) => {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Search
        placeholder="Search resources..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        onSearch={(value) => onFilterChange('search', value)}
      />

      <Space wrap size="middle">
        <Select
          placeholder="Filter by type"
          style={{ width: 150 }}
          value={filters.type}
          onChange={(value) => onFilterChange('type', value)}
          options={[...RESOURCE_TYPE_OPTIONS]}
        />

        <Select
          placeholder="Filter by status"
          style={{ width: 150 }}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
          options={[...RESOURCE_STATUS_OPTIONS]}
        />

        {categories.length > 0 && (
          <Select
            placeholder="Filter by category"
            style={{ width: 150 }}
            value={filters.category || undefined}
            onChange={(value) => onFilterChange('category', value || '')}
            allowClear
            options={categories.map((cat) => ({ label: cat, value: cat }))}
          />
        )}

        <Button
          icon={<ReloadOutlined />}
          onClick={onReset}
        >
          Reset
        </Button>
      </Space>
    </Space>
  );
};

