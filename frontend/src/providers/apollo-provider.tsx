import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@services';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ApolloProviderWrapper = ({ children }: Props) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

