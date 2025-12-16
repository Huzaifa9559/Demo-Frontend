import { useCallback } from "react";
import dayjs from "dayjs";
import { toaster } from "@components/ui";
import { useCreateProject, useUpdateProject } from "@services";
import type { ProjectRecord } from "@/types";

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
        status: values.status,
        dueDate: values.dueDate ? values.dueDate.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"),
        tickets: values.tickets,
      };

      try {
        if (formMode === "edit" && selectedProject) {
          await updateProject.mutateAsync({
            id: selectedProject.key,
            payload: normalizedProject,
          });
          toaster.success({ message: "Project updated successfully" });
        } else {
          await createProject.mutateAsync(normalizedProject);
          toaster.success({ message: "Project created successfully" });
        }
        onSuccess?.();
      } catch (error) {
        toaster.error({
          message: "Failed to save project",
          description: String(error),
        });
        throw error;
      }
    },
    [formMode, selectedProject, createProject, updateProject, onSuccess]
  );

  return { handleFormSubmit };
};
