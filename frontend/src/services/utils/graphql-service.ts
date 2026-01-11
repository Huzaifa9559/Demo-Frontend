import { SOMETHING_WENT_WRONG } from '@/utils/constants';

export type GraphQLResult<T> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: { message: string; code?: string; statusCode?: number } };

/**
 * Unwraps GraphQL response data
 * Handles nested data structures similar to API service
 */
const unwrapGraphQLResponse = <T>(data: unknown): T => {
  if (!data || typeof data !== 'object') {
    return data as T;
  }

  // If data has a 'data' property, unwrap it
  if ('data' in data && data.data !== null && data.data !== undefined) {
    return data.data as T;
  }

  return data as T;
};

/**
 * Processes failed GraphQL requests
 * Extracts error messages from GraphQL error structure
 */
const processFailedGraphQLRequest = <T>(error: Error | unknown): GraphQLResult<T> => {
  // Handle Apollo Client errors (has graphQLErrors property)
  if (error && typeof error === 'object' && 'graphQLErrors' in error) {
    const apolloError = error as { graphQLErrors?: Array<{ message?: string; extensions?: Record<string, unknown> }>; networkError?: unknown; message?: string };
    
    // Try to get error message from GraphQL errors
    if (apolloError.graphQLErrors && apolloError.graphQLErrors.length > 0) {
      const firstError = apolloError.graphQLErrors[0];
      const message =
        (typeof firstError.extensions?.message === 'string' ? firstError.extensions.message : undefined) ||
        firstError.message ||
        apolloError.message ||
        SOMETHING_WENT_WRONG;

      return {
        success: false,
        error: {
          message,
          code: firstError.extensions?.code as string | undefined,
          statusCode: firstError.extensions?.statusCode as number | undefined,
        },
      };
    }

    // Try to get error from network error
    if (apolloError.networkError) {
      const networkError = apolloError.networkError;
      const message =
        (networkError as { result?: { errors?: Array<{ message?: string }> } })?.result?.errors?.[0]?.message ||
        (networkError as { message?: string })?.message ||
        apolloError.message ||
        SOMETHING_WENT_WRONG;

      return {
        success: false,
        error: {
          message,
          statusCode: (networkError as { statusCode?: number })?.statusCode,
        },
      };
    }

    // Fallback to Apollo error message
    return {
      success: false,
      error: {
        message: apolloError.message || SOMETHING_WENT_WRONG,
      },
    };
  }

  // Handle regular Error objects
  if (error instanceof Error) {
    return {
      success: false,
      error: {
        message: error.message || SOMETHING_WENT_WRONG,
      },
    };
  }

  // Unknown error type
  return {
    success: false,
    error: {
      message: SOMETHING_WENT_WRONG,
    },
  };
};

/**
 * Executes a GraphQL mutation and returns a standardized result
 * Similar to apiService.post, apiService.put, etc.
 * @param mutationFn - The mutation function from Apollo Client
 * @param variables - Variables to pass to the mutation
 * @param fieldSelector - Optional function to extract the field from the response (e.g., (data) => data.login)
 */
export const executeMutation = async <TData, TVariables, TResponse = Record<string, TData>>(
  mutationFn: (variables: TVariables) => Promise<{ data?: TResponse }>,
  variables: TVariables,
  fieldSelector?: (data: TResponse) => TData
): Promise<GraphQLResult<TData>> => {
  try {
    const result = await mutationFn(variables);
    
    if (!result.data) {
      return {
        success: false,
        error: {
          message: SOMETHING_WENT_WRONG,
        },
      };
    }

    // If field selector is provided, use it to extract the field
    // Otherwise, unwrap the response
    const data = fieldSelector 
      ? fieldSelector(result.data)
      : unwrapGraphQLResponse<TData>(result.data as unknown);
    
    if (data === undefined || data === null) {
      return {
        success: false,
        error: {
          message: SOMETHING_WENT_WRONG,
        },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return processFailedGraphQLRequest<TData>(error);
  }
};

/**
 * Executes a GraphQL query and returns a standardized result
 * Similar to apiService.get
 * @param queryFn - The query function from Apollo Client
 * @param variables - Variables to pass to the query
 * @param fieldSelector - Optional function to extract the field from the response (e.g., (data) => data.me)
 */
export const executeQuery = async <TData, TVariables, TResponse = TData>(
  queryFn: (variables?: TVariables) => Promise<{ data?: TResponse }>,
  variables?: TVariables,
  fieldSelector?: (data: TResponse) => TData
): Promise<GraphQLResult<TData>> => {
  try {
    const result = await queryFn(variables);
    
    if (!result.data) {
      return {
        success: false,
        error: {
          message: SOMETHING_WENT_WRONG,
        },
      };
    }

    // If field selector is provided, use it to extract the field
    // Otherwise, unwrap the response
    const data = fieldSelector 
      ? fieldSelector(result.data)
      : unwrapGraphQLResponse<TData>(result.data as unknown);
    
    if (data === undefined || data === null) {
      return {
        success: false,
        error: {
          message: SOMETHING_WENT_WRONG,
        },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    return processFailedGraphQLRequest<TData>(error);
  }
};

/**
 * GraphQL service - similar to apiService
 * Handles all error processing and response unwrapping
 * Returns GraphQLResult<T> with success/error discriminated union
 */
export const graphqlService = {
  /**
   * Execute a GraphQL mutation
   * Returns GraphQLResult<T> - check result.success to handle success/error
   * @param mutationFn - The mutation function from Apollo Client
   * @param variables - Variables to pass to the mutation
   * @param fieldSelector - Optional function to extract the field from the response (e.g., (data) => data.login)
   */
  mutate: async <TData, TVariables, TResponse = Record<string, TData>>(
    mutationFn: (variables: TVariables) => Promise<{ data?: TResponse }>,
    variables: TVariables,
    fieldSelector?: (data: TResponse) => TData
  ): Promise<GraphQLResult<TData>> => {
    return executeMutation<TData, TVariables, TResponse>(mutationFn, variables, fieldSelector);
  },

  /**
   * Execute a GraphQL query
   * Returns GraphQLResult<T> - check result.success to handle success/error
   * @param queryFn - The query function from Apollo Client
   * @param variables - Variables to pass to the query
   * @param fieldSelector - Optional function to extract the field from the response (e.g., (data) => data.me)
   */
  query: async <TData, TVariables, TResponse = TData>(
    queryFn: (variables?: TVariables) => Promise<{ data?: TResponse }>,
    variables?: TVariables,
    fieldSelector?: (data: TResponse) => TData
  ): Promise<GraphQLResult<TData>> => {
    return executeQuery<TData, TVariables, TResponse>(queryFn, variables, fieldSelector);
  },
};

/**
 * Processes GraphQL query/mutation error from Apollo Client
 * Exported for use in hooks
 */
export const processGraphQLError = <T>(error: Error | unknown): GraphQLResult<T> => {
  return processFailedGraphQLRequest<T>(error);
};

