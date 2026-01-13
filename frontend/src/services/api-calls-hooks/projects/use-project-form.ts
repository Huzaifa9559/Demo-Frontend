import { useCallback } from "react";
import dayjs from "dayjs";
import { toaster } from "@components/ui";
import { useCreateProject, useUpdateProject } from "./index";
import { getErrorMessage } from "@utils";
import type { ProjectRecord, ProjectStatus } from "@/types/project";

type ProjectFormValues = {
  name: string;
  projectCode: string;
  owner: string;
  status: ProjectRecord["status"];
  dueDate: dayjs.Dayjs | null;
  tickets: number;
};

type UseProjectFormOptions = {
  selectedProject: ProjectRecord | null;
  formMode: "create" | "edit";
  onSuccess?: () => void;
};

// Map ProjectRecord status to GraphQL ProjectStatus
const mapStatusToGraphQL = (status: ProjectRecord["status"]): ProjectStatus => {
  const statusMap: Record<ProjectRecord["status"], ProjectStatus> = {
    "In Progress": "IN_PROGRESS",
    "On Hold": "ON_HOLD",
    "Completed": "COMPLETED",
    "Blocked": "BLOCKED",
  };
  return statusMap[status] || "IN_PROGRESS";
};

export const useProjectForm = ({
  selectedProject,
  formMode,
  onSuccess,
}: UseProjectFormOptions) => {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const handleFormSubmit = useCallback(
    async (values: ProjectFormValues) => {
      const normalizedProject = {
        name: values.name,
        projectCode: values.projectCode,
        owner: values.owner,
        status: mapStatusToGraphQL(values.status),
        dueDate: values.dueDate ? values.dueDate.toISOString() : dayjs().toISOString(),
        tickets: values.tickets,
      };

      try {
        if (formMode === "edit" && selectedProject) {
          const result = await updateProject.mutateAsync({
            id: selectedProject.key,
            input: normalizedProject,
          });
          
          if (!result.success) {
            throw new Error(result.error?.message || "Failed to update project");
          }
          
          toaster.success({ message: "Project updated successfully" });
        } else {
          const result = await createProject.mutateAsync(normalizedProject);
          
          if (!result.success) {
            throw new Error(result.error?.message || "Failed to create project");
          }
          
          toaster.success({ message: "Project created successfully" });
        }
        onSuccess?.();
      } catch (error) {
        toaster.error({ message: getErrorMessage(error) });
      }
    },
    [formMode, selectedProject, createProject, updateProject, onSuccess]
  );

  const isLoading = formMode === "edit" 
    ? updateProject.isPending 
    : createProject.isPending;

  return { handleFormSubmit, isLoading };
};

