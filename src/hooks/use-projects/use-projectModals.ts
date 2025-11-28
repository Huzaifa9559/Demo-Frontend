import { useState, useCallback } from "react";
import type { ProjectRecord } from "@/types";

type UseProjectModalsOptions = {
  initialSelectedProject?: ProjectRecord | null;
  initialIsDetailsOpen?: boolean;
  initialIsFormOpen?: boolean;
  initialFormMode?: "create" | "edit";
};

export const useProjectModals = ({
  initialSelectedProject = null,
  initialIsDetailsOpen = false,
  initialIsFormOpen = false,
  initialFormMode = "create",
}: UseProjectModalsOptions = {}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    initialSelectedProject
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(initialIsDetailsOpen);
  const [isFormOpen, setIsFormOpen] = useState(initialIsFormOpen);
  const [formMode, setFormMode] = useState<"create" | "edit">(initialFormMode);

  const openDetails = useCallback((project: ProjectRecord) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  }, []);

  const closeDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedProject(null);
  }, []);

  const openCreateForm = useCallback(() => {
    setSelectedProject(null);
    setFormMode("create");
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((project: ProjectRecord) => {
    setSelectedProject(project);
    setFormMode("edit");
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedProject(null);
  }, []);

  return {
    selectedProject,
    isDetailsOpen,
    isFormOpen,
    formMode,
    openDetails,
    closeDetails,
    openCreateForm,
    openEditForm,
    closeForm,
  };
};
