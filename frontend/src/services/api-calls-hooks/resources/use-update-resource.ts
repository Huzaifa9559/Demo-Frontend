import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { UPDATE_RESOURCE_MUTATION } from '../../mutations';
import type { UpdateResourcePayload } from './types';
import type { ResourceRecord } from '@/types/resource';

type UpdateResourcePayloadWithId = {
  payload: UpdateResourcePayload;
  id: string;
};

export const useUpdateResource = () => {
  return useGraphQLMutation<
    ResourceRecord,
    { id: string; input: UpdateResourcePayload },
    UpdateResourcePayloadWithId
  >({
    mutation: UPDATE_RESOURCE_MUTATION,
    fieldSelector: (data) => (data as { updateResource: ResourceRecord }).updateResource,
    inputWrapper: false, // Pass { id, input } directly as variables
  });
};
