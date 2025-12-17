import { type ReactNode } from "react";
import {
  ProjectsContextProvider,
  type ProjectsContextValue,
} from "../context/ProjectsContext";
import { useGetProjects } from "@services";
import {
  useProjectFilters,
  useProjectModals,
  useProjectForm,
} from "@hooks";
import { 
  ProjectsHeader,
  ProjectFilters,
  ProjectTable,
  ProjectViewModal,
} from "../components";
import { ProjectFormModal } from "../components/ProjectFormModal";

type ProjectsProviderProps = {
  children: ReactNode;
};

export const Projects = ({ children}: ProjectsProviderProps) => {
  const filters = useProjectFilters();
  const modals = useProjectModals();

  // Fetch projects with filters and pagination
  const { data: projectsData = { data: [], meta: { totalItems: 0 } }, isLoading } = useGetProjects({
    search: filters.searchTerm || undefined,
    status: filters.statusFilter !== "all" ? filters.statusFilter : undefined,
    range: filters.rangeFilter,
    page: filters.pagination.current,
    pageSize: filters.pagination.pageSize,
  });

  // Form submission
  const { handleFormSubmit, isLoading: isFormLoading } = useProjectForm({
    selectedProject: modals.selectedProject,
    formMode: modals.formMode,
    onSuccess: modals.closeForm,
  });

  // Context value
  const contextValue: ProjectsContextValue = {
    projects: projectsData.data,
    isLoading,
    pagination: {
      ...filters.pagination,
      total: projectsData.meta.totalItems,
    },
    projectsCount: projectsData.meta.totalItems,
    rangeFilter: filters.rangeFilter,
    onTableChange: filters.handleTableChange,
    openDetails: modals.openDetails,
    openEditForm: modals.openEditForm,
    isDetailsOpen: modals.isDetailsOpen,
    selectedProject: modals.selectedProject,
    closeDetails: modals.closeDetails,
    isFormOpen: modals.isFormOpen,
    formMode: modals.formMode,
    handleFormSubmit,
    isFormLoading,
    closeForm: modals.closeForm,
    openCreateForm: modals.openCreateForm,
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
Projects.FormModal = ProjectFormModal;
