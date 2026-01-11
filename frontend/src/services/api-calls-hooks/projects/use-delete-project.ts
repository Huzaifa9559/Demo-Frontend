import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { DELETE_PROJECT_MUTATION } from '../../mutations';

export const useDeleteProject = () => {
  return useGraphQLMutation<
    boolean,
    { id: string },
    { id: string }
  >({
    mutation: DELETE_PROJECT_MUTATION,
    fieldSelector: (data) => (data as { deleteProject: boolean }).deleteProject,
    inputWrapper: false, // Pass id directly
  });
};

