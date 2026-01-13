import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { UPDATE_PROJECT_MUTATION } from '../../mutations';
import type { UpdateProjectInput, Project } from '@/types/project';

type UpdateProjectPayload = {
  id: string;
  input: UpdateProjectInput;
};

export const useUpdateProject = () => {
  return useGraphQLMutation<
    Project,
    { id: string; input: UpdateProjectInput },
    UpdateProjectPayload
  >({
    mutation: UPDATE_PROJECT_MUTATION,
    fieldSelector: (data) => (data as { updateProject: Project }).updateProject,
    inputWrapper: false, // Pass { id, input } directly as variables
  });
};

