import { useCallback } from "react";
import { toaster } from "@components/ui";
import { useCreateResource, useUpdateResource } from "@services";
import { getErrorMessage } from "@utils";
import type { ResourceRecord } from "@/types/resource";
import type { CreateResourcePayload } from "@/services/api-call-hooks/resources";

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
          await updateResource.mutateAsync({
            payload: values,
            id: selectedResource.key,
          });
          toaster.success({ message: "Resource updated successfully" });
        } else {
          await createResource.mutateAsync(values);
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

