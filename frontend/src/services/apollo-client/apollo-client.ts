import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloLink } from '@apollo/client/link';
import { HttpLink } from '@apollo/client/link/http';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { getAuthToken, clearAuthToken } from '@/utils/functions';

const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/graphql`,
});

// Auth link to add token to headers
const authLink = new SetContextLink(({ headers }) => {
  const token = getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error link to only clear auth tokens on 401/Unauthorized
// Errors are handled at backend and displayed at frontend
const errorLink = new ErrorLink(({ error }) => {
  // Only handle auth token clearing, let errors pass through
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        clearAuthToken();
      }
    });
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        clearAuthToken();
      }
    });
  } else if ('statusCode' in error && error.statusCode === 401) {
    clearAuthToken();
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

