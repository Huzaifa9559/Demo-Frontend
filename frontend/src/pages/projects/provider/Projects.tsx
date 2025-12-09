import { type ReactNode } from "react";
import { Button } from "@components/ui";
import { PlusOutlined } from "@ant-design/icons";
import {
  ProjectsContextProvider,
  type ProjectsContextValue,
  type ProjectsLayoutConfig,
} from "../context/ProjectsContext";
import { PROJECT_STATUS_COLORS } from "@/types";
import { useGetProjects } from "@services";
import {
  useProjectFilters,
  useProjectFiltering,
  useProjectModals,
  useProjectForm,
  useProjectHeader,
} from "@hooks";
import { ProjectsHeader } from "../components/ProjectsHeader";
import { ProjectFilters } from "../components/ProjectFilters";
import { ProjectTable } from "../components/ProjectTable";
import { ProjectViewModal } from "../components/ProjectViewModal";
import { ProjectCreateModal } from "../components/ProjectCreateModal";
import { ProjectEditModal } from "../components/ProjectEditModal";

type ProjectsProviderProps = {
  children: ReactNode;
  layout?: ProjectsLayoutConfig;
};

function Projects({ children, layout }: ProjectsProviderProps) {
  // State management
  const filters = useProjectFilters();
  const modals = useProjectModals();

  // Fetch projects
  const { data: projects = [], isLoading } = useGetProjects({
    search: filters.searchTerm || undefined,
    status: filters.statusFilter !== "all" ? filters.statusFilter : undefined,
    range: filters.rangeFilter,
  });

  // Filter projects
  const { filteredProjects } = useProjectFiltering({
    projects,
    searchTerm: filters.searchTerm,
    statusFilter: filters.statusFilter,
    rangeFilter: filters.rangeFilter,
  });

  // Form submission
  const { handleFormSubmit } = useProjectForm({
    selectedProject: modals.selectedProject,
    formMode: modals.formMode,
    onSuccess: modals.closeForm,
  });

  // Header actions
  const defaultActions = (
    <Button type="primary" icon={<PlusOutlined />} onClick={modals.openCreateForm}>
      New Project
    </Button>
  );

  const { headerProps } = useProjectHeader({
    projectsCount: projects.length,
    rangeFilter: filters.rangeFilter,
    layout,
    defaultActions,
  });

  // Context value
  const contextValue: ProjectsContextValue = {
    projects,
    filteredProjects,
    statusColors: PROJECT_STATUS_COLORS,
    isLoading,
    searchTerm: filters.searchTerm,
    statusFilter: filters.statusFilter,
    rangeFilter: filters.rangeFilter,
    pagination: filters.pagination,
    handleSearchChange: filters.handleSearchChange,
    handleStatusChange: filters.handleStatusChange,
    handleRangeChange: filters.handleRangeChange,
    handleTableChange: filters.handleTableChange,
    onTableChange: filters.handleTableChange,
    openCreateForm: modals.openCreateForm,
    openEditForm: modals.openEditForm,
    openDetails: modals.openDetails,
    closeDetails: modals.closeDetails,
    isFormOpen: modals.isFormOpen,
    isDetailsOpen: modals.isDetailsOpen,
    formMode: modals.formMode,
    selectedProject: modals.selectedProject,
    handleFormSubmit,
    closeForm: modals.closeForm,
    detailsModalProps: {
      open: modals.isDetailsOpen,
      title: "Project details",
      onCancel: modals.closeDetails,
      onOk: modals.closeDetails,
      okText: "Close",
      cancelButtonProps: { style: { display: "none" } },
    },
    headerProps,
    layout,
  };

  return (
    <ProjectsContextProvider value={contextValue}>
      {children}
    </ProjectsContextProvider>
  );
};

// Attach sub-components for compound component pattern
Projects.Header = ProjectsHeader;
Projects.Filters = ProjectFilters;
Projects.Table = ProjectTable;
Projects.ViewModal = ProjectViewModal;
Projects.CreateModal = ProjectCreateModal;
Projects.EditModal = ProjectEditModal;

export { Projects };
