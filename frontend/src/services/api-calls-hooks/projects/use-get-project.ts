import { useGraphQLQuery } from '../../utils/use-graphql-query';
import { GET_PROJECT_QUERY } from '../../queries';
import type { Project } from '@/types/project';

export const useGetProject = (id: string, enabled: boolean = true) => {
  return useGraphQLQuery<Project>({
    query: GET_PROJECT_QUERY,
    variables: { id },
    fieldSelector: (data) => (data as { project: Project }).project,
    enabled: enabled && !!id,
    fetchPolicy: 'network-only',
  });
};

