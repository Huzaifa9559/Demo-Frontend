import { Card, List, Tag, Button, Space, Typography, Empty, Spin } from 'antd';
import { LinkOutlined, MoreOutlined } from '@ant-design/icons';
import { memo, useMemo } from 'react';
import type { ResourceRecord, ResourceType } from '@/types/resource';
import { RESOURCE_TYPE_COLORS, RESOURCE_TYPE_ICONS } from '@/types/resource';

const { Title, Text, Paragraph } = Typography;

type ResourceActions = {
  onView?: (resource: ResourceRecord) => void;
  onEdit?: (resource: ResourceRecord) => void;
  onDelete?: (resource: ResourceRecord) => void;
};

type ResourceTypeSectionProps = {
  type: ResourceType;
  resources: ResourceRecord[];
  actions?: ResourceActions;
  maxItems?: number;
  loading?: boolean;
};

export const ResourceTypeSection = memo(({
  type,
  resources,
  actions,
  maxItems = 5,
  loading = false,
}: ResourceTypeSectionProps) => {
  const displayResources = useMemo(() => resources.slice(0, maxItems), [resources, maxItems]);
  const hasMore = useMemo(() => resources.length > maxItems, [resources.length, maxItems]);

  if (resources.length === 0 && !loading) return null;

  return (
    <Card
      className="mb-6"
      loading={loading}
      title={
        <Space>
          <span className="text-xl">{RESOURCE_TYPE_ICONS[type]}</span>
          <Title level={4} className="m-0 capitalize">
            {type}
          </Title>
          <Tag color={RESOURCE_TYPE_COLORS[type]}>{resources.length}</Tag>
        </Space>
      }
      extra={
        hasMore && (
          <Button type="link" size="small">
            View All ({resources.length})
          </Button>
        )
      }
    >
      <List
        dataSource={displayResources}
        renderItem={(resource) => (
          <List.Item
            actions={[
              <Button
                key="view"
                type="link"
                size="small"
                onClick={() => actions?.onView?.(resource)}
              >
                View
              </Button>,
              <Button
                key="edit"
                type="link"
                size="small"
                onClick={() => actions?.onEdit?.(resource)}
              >
                Edit
              </Button>,
              <Button
                key="link"
                type="link"
                size="small"
                icon={<LinkOutlined />}
                onClick={() => window.open(resource.url, '_blank')}
              >
                Open
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Space>
                  <Text strong>{resource.title}</Text>
                  {resource.category && (
                    <Tag color="blue" size="small">{resource.category}</Tag>
                  )}
                  {resource.status === 'archived' && (
                    <Tag size="small">Archived</Tag>
                  )}
                </Space>
              }
              description={
                <div>
                  {resource.description && (
                    <Paragraph
                      ellipsis={{ rows: 1 }}
                      className="m-0 mb-1 text-gray-600"
                    >
                      {resource.description}
                    </Paragraph>
                  )}
                  <Space size="small" wrap>
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} size="small">{tag}</Tag>
                    ))}
                    {resource.tags.length > 3 && (
                      <Tag size="small">+{resource.tags.length - 3}</Tag>
                    )}
                  </Space>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
});

ResourceTypeSection.displayName = 'ResourceTypeSection';

