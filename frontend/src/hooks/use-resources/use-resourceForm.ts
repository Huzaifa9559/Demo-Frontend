import { useCallback } from "react";
import { toaster } from "@components/ui";
import { useCreateResource, useUpdateResource } from "@services";
import { getErrorMessage } from "@utils";
import type { ResourceRecord } from "@/types/resource";
import type { CreateResourcePayload } from "@/services/api-calls-hooks/resources";

type ResourceFormValues = CreateResourcePayload;

type UseResourceFormOptions = {
  selectedResource: ResourceRecord | null;
  formMode: "create" | "edit";
  onSuccess?: () => void;
};

export const useResourceForm = ({
  selectedResource,
  formMode,
  onSuccess,
}: UseResourceFormOptions) => {
  const createResource = useCreateResource();
  const updateResource = useUpdateResource();

  const handleFormSubmit = useCallback(
    async (values: ResourceFormValues) => {
      try {
        if (formMode === "edit" && selectedResource) {
          const result = await updateResource.mutateAsync({
            payload: values,
            id: selectedResource.key,
          });
          
          if (!result.success) {
            throw new Error(result.error?.message || "Failed to update resource");
          }
          
          toaster.success({ message: "Resource updated successfully" });
        } else {
          const result = await createResource.mutateAsync(values);
          
          if (!result.success) {
            throw new Error(result.error?.message || "Failed to create resource");
          }
          
          toaster.success({ message: "Resource created successfully" });
        }
        onSuccess?.();
      } catch (error) {
        toaster.error({ message: getErrorMessage(error) });
      }
    },
    [formMode, selectedResource, createResource, updateResource, onSuccess]
  );

  const isLoading = formMode === "edit" 
    ? updateResource.isPending 
    : createResource.isPending;

  return { handleFormSubmit, isLoading };
};

