import { useGraphQLQuery } from '../../utils/use-graphql-query';
import { ME_QUERY } from '../../queries';
import type { User } from '@/types/user';

export const useMe = () => {
  return useGraphQLQuery<Omit<User, 'password'>>({
    query: ME_QUERY,
    fieldSelector: (data) => (data as { me: Omit<User, 'password'> }).me,
    fetchPolicy: 'network-only',
  });
};

