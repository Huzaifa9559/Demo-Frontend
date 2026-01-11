import { useMutation } from '@apollo/client/react';
import type { DocumentNode, OperationVariables } from '@apollo/client';
import { graphqlService } from './graphql-service';
import type { GraphQLResult } from './graphql-service';

type UseGraphQLMutationOptions<TData, TVariables extends OperationVariables, TPayload = TVariables> = {
  mutation: DocumentNode;
  fieldSelector?: (data: unknown) => TData;
  /**
   * If true, wraps the payload in { input: payload } structure.
   * If false, passes variables directly as-is.
   * Default: true (for mutations using { input: ... } pattern)
   */
  inputWrapper?: boolean;
};

export const useGraphQLMutation = <
  TData,
  TVariables extends OperationVariables = OperationVariables,
  TPayload = TVariables
>({
  mutation,
  fieldSelector,
  inputWrapper = true,
}: UseGraphQLMutationOptions<TData, TVariables, TPayload>) => {
  const [mutate, { loading, error }] = useMutation<unknown, TVariables>(mutation);

  const mutateAsync = async (payload: TPayload): Promise<GraphQLResult<TData>> => {
    const variables = inputWrapper 
      ? ({ input: payload } as unknown as TVariables)
      : (payload as unknown as TVariables);

    return await graphqlService.mutate<TData, TVariables, unknown>(
      async (vars) => {
        const { data } = await mutate({ variables: vars });
        return { data };
      },
      variables,
      fieldSelector as ((data: unknown) => TData) | undefined
    );
  };

  return {
    mutateAsync,
    isPending: loading,
    error,
  };
};

