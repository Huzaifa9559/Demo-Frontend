import { Card, Statistic, Row, Col } from 'antd';
import { memo, useMemo } from 'react';
import type { ResourceRecord, ResourceType } from '@/types/resource';
import { RESOURCE_TYPE_ICONS, RESOURCE_TYPE_COLORS } from '@/types/resource';

type ResourceStatsProps = {
  resources: ResourceRecord[];
  onTypeClick?: (type: ResourceType | 'all') => void;
};

export const ResourceStats = memo(({ resources, onTypeClick }: ResourceStatsProps) => {
  const stats = useMemo(() => ({
    total: resources.length,
    active: resources.filter((r) => r.status === 'active').length,
    archived: resources.filter((r) => r.status === 'archived').length,
    byType: resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<ResourceType, number>),
  }), [resources]);

  const typeStats = useMemo(() => [
    { type: 'document' as ResourceType, count: stats.byType.document || 0 },
    { type: 'link' as ResourceType, count: stats.byType.link || 0 },
    { type: 'file' as ResourceType, count: stats.byType.file || 0 },
    { type: 'video' as ResourceType, count: stats.byType.video || 0 },
    { type: 'image' as ResourceType, count: stats.byType.image || 0 },
    { type: 'other' as ResourceType, count: stats.byType.other || 0 },
  ], [stats.byType]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Total Resources"
            value={stats.total}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Active"
            value={stats.active}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Archived"
            value={stats.archived}
            valueStyle={{ color: '#8c8c8c' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="Categories"
            value={new Set(resources.map((r) => r.category).filter(Boolean)).size}
            valueStyle={{ color: '#722ed1' }}
          />
        </Card>
      </Col>

      {typeStats.map(({ type, count }) => (
        <Col key={type} xs={12} sm={8} md={4}>
          <Card
            hoverable={!!onTypeClick}
            onClick={() => onTypeClick?.(type)}
            className="text-center cursor-pointer"
          >
            <div className="text-2xl mb-2">{RESOURCE_TYPE_ICONS[type]}</div>
            <Statistic
              value={count}
              valueStyle={{ fontSize: '20px', color: RESOURCE_TYPE_COLORS[type] }}
            />
            <div className="text-xs text-gray-500 capitalize mt-1">{type}</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
});

ResourceStats.displayName = 'ResourceStats';

