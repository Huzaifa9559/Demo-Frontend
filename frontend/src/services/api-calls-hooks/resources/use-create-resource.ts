import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { CREATE_RESOURCE_MUTATION } from '../../mutations';
import type { CreateResourcePayload } from './types';
import type { ResourceRecord } from '@/types/resource';

export const useCreateResource = () => {
  return useGraphQLMutation<
    ResourceRecord,
    { input: CreateResourcePayload },
    CreateResourcePayload
  >({
    mutation: CREATE_RESOURCE_MUTATION,
    fieldSelector: (data) => (data as { createResource: ResourceRecord }).createResource,
    inputWrapper: true,
  });
};
