import { Row, Col, Empty, Spin } from 'antd';
import type { ResourceRecord } from '@/types/resource';
import { ResourceCard } from './ResourceCard';

type ResourceActions = {
  onView?: (resource: ResourceRecord) => void;
  onEdit?: (resource: ResourceRecord) => void;
  onDelete?: (resource: ResourceRecord) => void;
};

type ResourceGridProps = {
  resources: ResourceRecord[];
  loading?: boolean;
  actions?: ResourceActions;
  showActions?: boolean;
  columns?: number;
};

export const ResourceGrid = ({
  resources,
  loading = false,
  actions,
  showActions = true,
  columns = 3,
}: ResourceGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <Empty
        description="No resources found"
        className="py-12"
      />
    );
  }

  const span = 24 / columns;

  return (
    <Row gutter={[16, 16]}>
      {resources.map((resource) => (
        <Col key={resource.key} xs={24} sm={12} md={12} lg={span} xl={span}>
          <ResourceCard
            resource={resource}
            actions={actions}
            showActions={showActions}
          />
        </Col>
      ))}
    </Row>
  );
};

