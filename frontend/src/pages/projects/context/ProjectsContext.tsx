import { createContext, useContext, type ReactNode } from "react";
import type { TablePaginationConfig, TableProps } from "antd";
import type { ProjectRecord } from "@/types";
import type { ProjectFormValues } from "../components/ProjectFormModal";
import type { RangeFilter } from "@utils";

export type ProjectsContextValue = {
  // Data
  projects: ProjectRecord[];
  isLoading: boolean;
  pagination: TablePaginationConfig;
  projectsCount: number;
  rangeFilter: RangeFilter;
  
  // Table actions
  onTableChange: TableProps<ProjectRecord>["onChange"];
  openDetails: (project: ProjectRecord) => void;
  openEditForm: (project: ProjectRecord) => void;
  
  // Modal state
  isDetailsOpen: boolean;
  selectedProject: ProjectRecord | null;
  closeDetails: () => void;
  
  // Form state
  isFormOpen: boolean;
  formMode: "create" | "edit";
  handleFormSubmit: (values: ProjectFormValues) => Promise<void>;
  isFormLoading: boolean;
  closeForm: () => void;
  openCreateForm: () => void;
};

const ProjectsContext = createContext<ProjectsContextValue | undefined>(
  undefined
);

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "useProjectsContext must be used within a ProjectsContext provider"
    );
  }
  return context;
};

export const ProjectsContextProvider = ProjectsContext.Provider;
