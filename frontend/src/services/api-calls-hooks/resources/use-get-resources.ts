import { useGraphQLQuery } from '../../utils/use-graphql-query';
import { GET_RESOURCES_QUERY } from '../../queries';
import type { ResourcesResponse, ResourcesQueryParams } from './types';

export const useGetResources = (params?: ResourcesQueryParams) => {
  return useGraphQLQuery<ResourcesResponse>({
    query: GET_RESOURCES_QUERY,
    variables: params ? { input: params } : undefined,
    fieldSelector: (data) => (data as { resources: ResourcesResponse }).resources,
    fetchPolicy: 'network-only',
  });
};
