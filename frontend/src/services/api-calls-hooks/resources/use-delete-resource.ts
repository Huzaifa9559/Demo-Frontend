import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { DELETE_RESOURCE_MUTATION } from '../../mutations';

export const useDeleteResource = () => {
  const mutation = useGraphQLMutation<
    boolean,
    { id: string },
    { id: string }
  >({
    mutation: DELETE_RESOURCE_MUTATION,
    fieldSelector: (data) => (data as { deleteResource: boolean }).deleteResource,
    inputWrapper: false,
  });

  return {
    ...mutation,
    mutateAsync: async (id: string) => {
      return mutation.mutateAsync({ id });
    },
  };
};
