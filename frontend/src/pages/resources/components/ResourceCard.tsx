import { Card, Tag, Button, Space, Typography } from 'antd';
import { LinkOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ResourceRecord } from '@/types/resource';
import { RESOURCE_TYPE_COLORS, RESOURCE_TYPE_ICONS } from '@/types/resource';

const { Title, Text, Paragraph } = Typography;

type ResourceActions = {
  onView?: (resource: ResourceRecord) => void;
  onEdit?: (resource: ResourceRecord) => void;
  onDelete?: (resource: ResourceRecord) => void;
};

type ResourceCardProps = {
  resource: ResourceRecord;
  actions?: ResourceActions;
  showActions?: boolean;
};

export const ResourceCard = ({
  resource,
  actions,
  showActions = true,
}: ResourceCardProps) => {
  const handleView = () => actions?.onView?.(resource);
  const handleEdit = () => actions?.onEdit?.(resource);
  const handleDelete = () => actions?.onDelete?.(resource);
  const handleExternalLink = () => window.open(resource.url, '_blank');

  return (
    <Card
      hoverable
      className="h-full"
      actions={
        showActions
          ? [
              <Button
                key="view"
                type="text"
                icon={<EyeOutlined />}
                onClick={handleView}
              >
                View
              </Button>,
              <Button
                key="edit"
                type="text"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Edit
              </Button>,
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                Delete
              </Button>,
            ]
          : undefined
      }
    >
      <Space direction="vertical" size="small" className="w-full">
        <div className="flex items-start justify-between">
          <Title level={5} className="m-0 flex-1">
            {resource.title}
          </Title>
          <Tag color={RESOURCE_TYPE_COLORS[resource.type]}>
            {RESOURCE_TYPE_ICONS[resource.type]} {resource.type}
          </Tag>
        </div>

        {resource.description && (
          <Paragraph
            ellipsis={{ rows: 2, expandable: false }}
            className="text-gray-600 m-0"
          >
            {resource.description}
          </Paragraph>
        )}

        <div className="flex flex-wrap gap-1">
          {resource.category && (
            <Tag color="blue">{resource.category}</Tag>
          )}
          {resource.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {resource.tags.length > 3 && (
            <Tag>+{resource.tags.length - 3}</Tag>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Text type="secondary" className="text-xs">
            {resource.author || 'Unknown'} • {new Date(resource.createdAt).toLocaleDateString()}
          </Text>
          <Button
            type="link"
            size="small"
            icon={<LinkOutlined />}
            onClick={handleExternalLink}
          >
            Open
          </Button>
        </div>
      </Space>
    </Card>
  );
};

