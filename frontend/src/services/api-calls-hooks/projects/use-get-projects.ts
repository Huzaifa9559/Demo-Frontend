import { useGraphQLQuery } from '../../utils/use-graphql-query';
import { GET_PROJECTS_QUERY } from '../../queries';
import type { ProjectsOutput, ProjectsQueryInput } from '@/types/project';

export const useGetProjects = (variables?: { input?: ProjectsQueryInput }) => {
  return useGraphQLQuery<ProjectsOutput>({
    query: GET_PROJECTS_QUERY,
    variables,
    fieldSelector: (data) => (data as { projects: ProjectsOutput }).projects,
    fetchPolicy: 'network-only',
  });
};

