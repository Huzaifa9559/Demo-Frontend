import { useQuery } from '@apollo/client/react';
import type { DocumentNode, OperationVariables } from '@apollo/client';
import { processGraphQLError } from './graphql-service';
import type { GraphQLResult } from './graphql-service';

type UseGraphQLQueryOptions<TData, TVariables extends OperationVariables> = {
  query: DocumentNode;
  variables?: TVariables;
  fieldSelector?: (data: unknown) => TData;
  enabled?: boolean;
  fetchPolicy?: 'cache-first' | 'network-only' | 'cache-and-network' | 'no-cache';
};

export const useGraphQLQuery = <TData, TVariables extends OperationVariables = OperationVariables>({
  query,
  variables,
  fieldSelector,
  enabled = true,
  fetchPolicy = 'network-only',
}: UseGraphQLQueryOptions<TData, TVariables>) => {
  const { data, loading, error, refetch: apolloRefetch } = useQuery(query, {
    variables,
    errorPolicy: 'all',
    fetchPolicy,
    skip: !enabled,
  } as any);

  const result: GraphQLResult<TData> | null = data
    ? (() => {
        try {
          const processedData = fieldSelector ? fieldSelector(data) : (data as TData);
          return {
            success: true,
            data: processedData,
          };
        } catch (err) {
          return processGraphQLError<TData>(err);
        }
      })()
    : error
      ? processGraphQLError<TData>(error)
      : null;

  const refetch = async () => {
    const { data: refetchData, error: refetchError } = await apolloRefetch();
    
    if (refetchError) {
      return processGraphQLError<TData>(refetchError);
    }

    if (!refetchData) {
      return {
        success: false,
        error: {
          message: 'No data returned',
        },
      } as GraphQLResult<TData>;
    }

    try {
      const processedData = fieldSelector ? fieldSelector(refetchData) : (refetchData as TData);
      return {
        success: true,
        data: processedData,
      } as GraphQLResult<TData>;
    } catch (err) {
      return processGraphQLError<TData>(err);
    }
  };

  return {
    result,
    data: result?.success ? result.data : undefined,
    isLoading: loading,
    error: result?.success ? undefined : result?.error,
    refetch,
  };
};

