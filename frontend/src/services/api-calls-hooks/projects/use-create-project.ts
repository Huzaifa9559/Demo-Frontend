import { useGraphQLMutation } from '../../utils/use-graphql-mutation';
import { CREATE_PROJECT_MUTATION } from '../../mutations';
import type { CreateProjectInput, Project } from '@/types/project';

export const useCreateProject = () => {
  return useGraphQLMutation<
    Project,
    { input: CreateProjectInput },
    CreateProjectInput
  >({
    mutation: CREATE_PROJECT_MUTATION,
    fieldSelector: (data) => (data as { createProject: Project }).createProject,
    inputWrapper: true,
  });
};

