import { registerAs } from '@nestjs/config';

export const graphqlConfig = registerAs('graphql', () => ({
  playground: process.env.GRAPHQL_PLAYGROUND === 'true' || process.env.NODE_ENV === 'development',
  introspection: process.env.GRAPHQL_INTROSPECTION === 'true' || process.env.NODE_ENV === 'development',
  path: process.env.GRAPHQL_PATH || '/graphql',
}));

