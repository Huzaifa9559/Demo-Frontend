import { Modal, Descriptions, Tag, Space, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import type { ResourceRecord } from '@/types/resource';
import { RESOURCE_TYPE_COLORS, RESOURCE_TYPE_ICONS } from '@/types/resource';

type ResourceViewModalProps = {
  open: boolean;
  resource: ResourceRecord | null;
  onClose: () => void;
  onEdit?: (resource: ResourceRecord) => void;
};

export const ResourceViewModal = ({
  open,
  resource,
  onClose,
  onEdit,
}: ResourceViewModalProps) => {
  if (!resource) return null;

  const handleExternalLink = () => {
    window.open(resource.url, '_blank');
  };

  return (
    <Modal
      open={open}
      title={resource.title}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        onEdit && (
          <Button key="edit" type="primary" onClick={() => onEdit(resource)}>
            Edit
          </Button>
        ),
        <Button
          key="external"
          type="default"
          icon={<LinkOutlined />}
          onClick={handleExternalLink}
        >
          Open Link
        </Button>,
      ].filter(Boolean)}
      width={700}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Type">
          <Tag color={RESOURCE_TYPE_COLORS[resource.type]}>
            {RESOURCE_TYPE_ICONS[resource.type]} {resource.type}
          </Tag>
        </Descriptions.Item>

        {resource.description && (
          <Descriptions.Item label="Description">
            {resource.description}
          </Descriptions.Item>
        )}

        <Descriptions.Item label="URL">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            {resource.url}
          </a>
        </Descriptions.Item>

        {resource.category && (
          <Descriptions.Item label="Category">
          <Tag color="blue">{resource.category}</Tag>
        </Descriptions.Item>
        )}

        <Descriptions.Item label="Status">
          <Tag color={resource.status === 'active' ? 'green' : 'default'}>
            {resource.status}
          </Tag>
        </Descriptions.Item>

        {resource.tags.length > 0 && (
          <Descriptions.Item label="Tags">
            <Space wrap>
              {resource.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Space>
          </Descriptions.Item>
        )}

        {resource.author && (
          <Descriptions.Item label="Author">
            {resource.author}
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Created At">
          {new Date(resource.createdAt).toLocaleString()}
        </Descriptions.Item>

        <Descriptions.Item label="Updated At">
          {new Date(resource.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

