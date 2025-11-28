import { type FC, type ReactNode, useMemo, type ComponentType } from "react";
import type { TableProps } from "antd";
import { Button } from "@components/ui";
import { PlusOutlined } from "@ant-design/icons";
import {
  ProjectsContextProvider,
  type ProjectsContextValue,
} from "../context/ProjectsContext";
import type { ProjectsLayoutConfig } from "../context/ProjectsContext";
import { PROJECT_STATUS_COLORS } from "@/types";
import { useGetProjects } from "@services";
import {
  useProjectFilters,
  useProjectFiltering,
  useProjectModals,
  useProjectForm,
  useProjectHeader,
} from "@hooks";
// Import directly from files to avoid circular dependency through index
import { ProjectsHeader } from "../components/ProjectsHeader";
import { ProjectsCard } from "../components/ProjectsCard";
import { ProjectFilters } from "../components/ProjectFilters";
import { ProjectTable } from "../components/ProjectTable";
import { ProjectDetailsModal } from "../components/ProjectDetailsModal";
import { ProjectFormModal } from "../components/ProjectFormModal";

type ProjectsProviderProps = {
  children: ReactNode;
  layout?: ProjectsLayoutConfig;
};

const ProjectsProvider = ({ children, layout }: ProjectsProviderProps) => {
  // Filter state management
  const {
    searchTerm,
    statusFilter,
    rangeFilter,
    pagination,
    handleSearchChange,
    handleStatusChange,
    handleRangeChange,
    handleTableChange,
  } = useProjectFilters();

  // Modal state management
  const {
    selectedProject,
    isDetailsOpen,
    isFormOpen,
    formMode,
    openDetails,
    closeDetails,
    openCreateForm,
    openEditForm,
    closeForm,
  } = useProjectModals();

  // Fetch projects
  const { data: projects = [], isLoading } = useGetProjects({
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    range: rangeFilter,
  });

  // Filter projects
  const { filteredProjects } = useProjectFiltering({
    projects,
    searchTerm,
    statusFilter,
    rangeFilter,
  });

  // Form submission
  const { handleFormSubmit } = useProjectForm({
    selectedProject,
    formMode,
    onSuccess: closeForm,
  });

  // Header props
  const defaultActions = useMemo(
    () => (
      <Button type="primary" icon={<PlusOutlined />} onClick={openCreateForm}>
        New Project
      </Button>
    ),
    [openCreateForm]
  );

  const { headerProps } = useProjectHeader({
    projectsCount: projects.length,
    rangeFilter,
    layout,
    defaultActions,
  });

  const contextValue: ProjectsContextValue = useMemo(
    () => ({
      projects,
      filteredProjects,
      statusColors: PROJECT_STATUS_COLORS,
      isLoading,
      searchValue: searchTerm,
      statusValue: statusFilter,
      rangeValue: rangeFilter,
      pagination,
      onSearchChange: handleSearchChange,
      onStatusChange: handleStatusChange,
      onRangeChange: handleRangeChange,
      onTableChange: handleTableChange,
      openCreateForm,
      openEditForm,
      openDetails,
      closeDetails,
      isFormOpen,
      isDetailsOpen,
      formMode,
      selectedProject,
      handleFormSubmit,
      closeForm,
      detailsModalProps: {
        open: isDetailsOpen,
        title: "Project details",
        onCancel: closeDetails,
        onOk: closeDetails,
        okText: "Close",
        cancelButtonProps: { style: { display: "none" } },
      },
      headerProps,
      layout,
    }),
    [
      projects,
      filteredProjects,
      isLoading,
      searchTerm,
      statusFilter,
      rangeFilter,
      pagination,
      handleSearchChange,
      handleStatusChange,
      handleRangeChange,
      handleTableChange,
      openCreateForm,
      openEditForm,
      openDetails,
      closeDetails,
      isFormOpen,
      isDetailsOpen,
      formMode,
      selectedProject,
      handleFormSubmit,
      closeForm,
      headerProps,
      layout,
    ]
  );

  return (
    <ProjectsContextProvider value={contextValue}>
      {children}
    </ProjectsContextProvider>
  );
};

// Create compound component - use ComponentType to avoid typeof initialization issues
// ProjectFilters is a compound component with sub-components
const Projects = ProjectsProvider as typeof ProjectsProvider & {
  Header: ComponentType<any>;
  Card: ComponentType<any>;
  Filters: typeof ProjectFilters;
  Table: ComponentType<any>;
  DetailsModal: ComponentType<any>;
  FormModal: ComponentType<any>;
};

// Attach sub-components to create compound component pattern
// Use IIFE to ensure assignment happens after all modules are initialized
(() => {
  Projects.Header = ProjectsHeader;
  Projects.Card = ProjectsCard;
  Projects.Filters = ProjectFilters;
  Projects.Table = ProjectTable;
  Projects.DetailsModal = ProjectDetailsModal;
  Projects.FormModal = ProjectFormModal;
})();

export { Projects };
