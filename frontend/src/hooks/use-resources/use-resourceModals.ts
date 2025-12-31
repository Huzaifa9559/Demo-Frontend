import { useState, useCallback } from "react";
import type { ResourceRecord } from "@/types/resource";

type UseResourceModalsOptions = {
  initialSelectedResource?: ResourceRecord | null;
  initialIsDetailsOpen?: boolean;
  initialIsFormOpen?: boolean;
  initialFormMode?: "create" | "edit";
};

export const useResourceModals = ({
  initialSelectedResource = null,
  initialIsDetailsOpen = false,
  initialIsFormOpen = false,
  initialFormMode = "create",
}: UseResourceModalsOptions = {}) => {
  const [selectedResource, setSelectedResource] = useState<ResourceRecord | null>(
    initialSelectedResource
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(initialIsDetailsOpen);
  const [isFormOpen, setIsFormOpen] = useState(initialIsFormOpen);
  const [formMode, setFormMode] = useState<"create" | "edit">(initialFormMode);

  const openDetails = useCallback((resource: ResourceRecord) => {
    setSelectedResource(resource);
    setIsDetailsOpen(true);
  }, []);

  const closeDetails = useCallback(() => {
    setIsDetailsOpen(false);
    setSelectedResource(null);
  }, []);

  const openCreateForm = useCallback(() => {
    setSelectedResource(null);
    setFormMode("create");
    setIsFormOpen(true);
  }, []);

  const openEditForm = useCallback((resource: ResourceRecord) => {
    setSelectedResource(resource);
    setFormMode("edit");
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedResource(null);
  }, []);

  return {
    selectedResource,
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

