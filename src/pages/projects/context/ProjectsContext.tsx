import { createContext, useContext, type ReactNode } from "react";
import type { TablePaginationConfig, TableProps } from "antd";
import type { ProjectRecord } from "@/types";
import type { RangeFilter, StatusFilter } from "@utils";
import type { ProjectFormValues } from "../components/ProjectFormModal";
import type { ModalProps, HeaderProps } from "@components/ui";

export type ProjectsLayoutConfig = {
  headerTitle?: string;
  headerSubtitle?: string;
  headerActions?: ReactNode;
};

export type ProjectsContextValue = {
  projects: ProjectRecord[];
  filteredProjects: ProjectRecord[];
  statusColors: Record<ProjectRecord["status"], string>;
  isLoading: boolean;
  searchValue: string;
  statusValue: StatusFilter;
  rangeValue: RangeFilter;
  pagination: TablePaginationConfig;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onRangeChange: (value: RangeFilter) => void;
  onTableChange: TableProps<ProjectRecord>["onChange"];
  openCreateForm: () => void;
  openEditForm: (project: ProjectRecord) => void;
  openDetails: (project: ProjectRecord) => void;
  closeDetails: () => void;
  isFormOpen: boolean;
  isDetailsOpen: boolean;
  formMode: "create" | "edit";
  selectedProject: ProjectRecord | null;
  handleFormSubmit: (values: ProjectFormValues) => Promise<void>;
  closeForm: () => void;
  detailsModalProps: Pick<
    ModalProps,
    "open" | "title" | "onCancel" | "onOk" | "okText" | "cancelButtonProps"
  >;
  headerProps: Pick<
    HeaderProps,
    "label" | "title" | "subtitle" | "subtitleSuffix" | "actions"
  >;
  layout?: ProjectsLayoutConfig;
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
