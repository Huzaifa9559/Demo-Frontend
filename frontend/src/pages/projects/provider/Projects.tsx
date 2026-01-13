import { type ReactNode } from "react";
import {
  ProjectsContextProvider,
  type ProjectsContextValue,
} from "../context/ProjectsContext";
import {
  useGetProjects,
  useProjectFilters,
  useProjectModals,
  useProjectForm,
} from "@services";
import type { ProjectRecord } from "@/types/project";
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

  // Map status filter to GraphQL ProjectStatus
  const mapStatusToGraphQL = (status: string): string | undefined => {
    if (status === "all") return undefined;
    const statusMap: Record<string, string> = {
      "active": "IN_PROGRESS",
      "hold": "ON_HOLD",
      "completed": "COMPLETED",
      "blocked": "BLOCKED",
    };
    return statusMap[status];
  };

  // Fetch projects with filters and pagination
  const { data: projectsData, isLoading } = useGetProjects({
    input: {
      search: filters.searchTerm || undefined,
      status: filters.statusFilter !== "all" ? mapStatusToGraphQL(filters.statusFilter) as any : undefined,
      range: filters.rangeFilter,
      page: filters.pagination.current,
      take: filters.pagination.pageSize,
    },
  });

  const projectsDataWithDefaults = projectsData || { 
    data: [], 
    meta: { 
      totalItems: 0, 
      page: 1, 
      take: 5, 
      totalPages: 0, 
      hasPreviousPage: false, 
      hasNextPage: false 
    } 
  };

  // Form submission
  const { handleFormSubmit, isLoading: isFormLoading } = useProjectForm({
    selectedProject: modals.selectedProject,
    formMode: modals.formMode,
    onSuccess: modals.closeForm,
  });

  // Map GraphQL Project to ProjectRecord
  const mapProjectToRecord = (project: any): ProjectRecord => {
    const statusMap: Record<string, ProjectRecord["status"]> = {
      "IN_PROGRESS": "In Progress",
      "ON_HOLD": "On Hold",
      "COMPLETED": "Completed",
      "BLOCKED": "Blocked",
    };
    
    return {
      key: project.id,
      projectCode: project.projectCode,
      name: project.name,
      owner: project.owner,
      status: statusMap[project.status] || "In Progress",
      dueDate: typeof project.dueDate === 'string' ? project.dueDate : project.dueDate.toISOString().split('T')[0],
      tickets: project.tickets,
    };
  };

  // Context value
  const contextValue: ProjectsContextValue = {
    projects: projectsDataWithDefaults.data.map(mapProjectToRecord),
    isLoading,
    pagination: {
      ...filters.pagination,
      total: projectsDataWithDefaults.meta.totalItems,
    },
    projectsCount: projectsDataWithDefaults.meta.totalItems,
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
