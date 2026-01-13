import { Button, Typography, Spin, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useCallback } from 'react';
import { useGetResources, useDeleteResource } from '@services';
import {
  useResourceFilters,
  useResourceModals,
  useResourceForm,
} from '@hooks';
import { toaster } from '@components/ui';
import { getErrorMessage } from '@utils';
import type { ResourceTypeFilter, ResourceStatusFilter, ResourceRecord, ResourceType } from '@/types/resource';
import {
  ResourceStats,
  ResourceTypeSection,
  ResourceQuickFilters,
  ResourceFormModal,
  ResourceViewModal,
} from './components';

const { Title } = Typography;

export const ResourcesScreen = () => {
  // Headless hooks
  const filters = useResourceFilters();
  const modals = useResourceModals();
  const deleteResource = useDeleteResource();

  // Fetch ALL resources for stats (no filters)
  const { data: allResourcesData = { data: [], meta: { totalItems: 0 } } } = useGetResources({
    pageSize: 1000,
  });

  // Fetch filtered resources for sections
  const { data: resourcesData = { data: [], meta: { totalItems: 0 } }, isLoading } = useGetResources({
    search: filters.searchTerm || undefined,
    type: filters.typeFilter !== "all" ? filters.typeFilter : undefined,
    status: filters.statusFilter !== "all" ? filters.statusFilter : undefined,
    category: filters.categoryFilter || undefined,
    pageSize: 1000, // Get all for dashboard view
  });

  // Form submission
  const { handleFormSubmit, isLoading: isFormLoading } = useResourceForm({
    selectedResource: modals.selectedResource,
    formMode: modals.formMode,
    onSuccess: modals.closeForm,
  });

  // Delete handler
  const handleDelete = useCallback(async (resource: ResourceRecord) => {
    try {
      const result = await deleteResource.mutateAsync(resource.key);
      
      if (!result.success) {
        throw new Error(result.error?.message || "Failed to delete resource");
      }
      
      toaster.success({ message: "Resource deleted successfully" });
    } catch (error) {
      toaster.error({ message: getErrorMessage(error) });
    }
  }, [deleteResource]);

  // Group resources by type (only filtered resources)
  const resourcesByType = useMemo(() => {
    const grouped: Record<ResourceType, ResourceRecord[]> = {
      document: [],
      link: [],
      file: [],
      video: [],
      image: [],
      other: [],
    };

    resourcesData.data.forEach((resource) => {
      if (grouped[resource.type]) {
        grouped[resource.type].push(resource);
      }
    });

    return grouped;
  }, [resourcesData.data]);

  // Group actions (memoized to prevent re-renders)
  const resourceActions = useMemo(() => ({
    onView: modals.openDetails,
    onEdit: modals.openEditForm,
    onDelete: handleDelete,
  }), [modals.openDetails, modals.openEditForm, handleDelete]);

  const handleTypeClick = useCallback((type: ResourceType | 'all') => {
    filters.setFilterParams('type', type === 'all' ? 'all' : type);
  }, [filters]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Title level={2} className="m-0">
          Resource Hub
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={modals.openCreateForm}
          size="large"
        >
          Add Resource
        </Button>
      </div>

      {/* Stats Dashboard - Show all resources, not filtered */}
      <ResourceStats
        resources={allResourcesData.data}
        onTypeClick={handleTypeClick}
      />

      {/* Quick Filters */}
      <ResourceQuickFilters
        search={filters.searchTerm}
        typeFilter={filters.typeFilter as ResourceTypeFilter}
        statusFilter={filters.statusFilter as ResourceStatusFilter}
        onSearchChange={(value) => filters.setFilterParams('search', value)}
        onTypeFilterChange={(value) => filters.setFilterParams('type', value)}
        onStatusFilterChange={(value) => filters.setFilterParams('status', value)}
      />

      {/* Resources by Type Sections */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
        </div>
      ) : resourcesData.data.length === 0 ? (
        <Empty description="No resources found" className="py-12" />
      ) : (
        <div>
          {(Object.keys(resourcesByType) as ResourceType[]).map((type) => (
            <ResourceTypeSection
              key={type}
              type={type}
              resources={resourcesByType[type]}
              actions={resourceActions}
              maxItems={5}
              loading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <ResourceViewModal
        open={modals.isDetailsOpen}
        resource={modals.selectedResource}
        onClose={modals.closeDetails}
        onEdit={modals.openEditForm}
      />

      <ResourceFormModal
        open={modals.isFormOpen}
        mode={modals.formMode}
        resource={modals.selectedResource}
        onSubmit={handleFormSubmit}
        onCancel={modals.closeForm}
        loading={isFormLoading}
      />
    </div>
  );
};
