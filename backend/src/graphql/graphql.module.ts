import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { ResourcesModule } from '../resources/resources.module';
import { AuthResolver } from '../auth/auth.resolver';
import { ProjectsResolver } from '../projects/projects.resolver';
import { ResourcesResolver } from '../resources/resources.resolver';
import {
  DateTimeScalar,
  EmailScalar,
  NonEmptyStringScalar,
  PositiveIntScalar,
  NonNegativeIntScalar,
  PasswordScalar,
} from './scalars';
import { GraphqlExceptionFilter } from '../common/filters/graphql-exception.filter';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const graphqlPath =
          configService.get<string>('graphql.path') || '/graphql';
        const playground =
          configService.get<boolean>('graphql.playground') ?? true;
        const introspection =
          configService.get<boolean>('graphql.introspection') ?? true;

        return {
          // Scan all module folders for GraphQL schema files
          // Order matters: shared schemas first, then module schemas
          typePaths: [
            join(process.cwd(), 'src/graphql/common/schema/**/*.graphql'), // Shared scalars first
            join(process.cwd(), 'src/users/schema/**/*.graphql'), // User type
            join(process.cwd(), 'src/**/schema/**/*.graphql'), // Module schemas
          ],
          // Type generation is handled by graphql-codegen (see codegen.yml)
          // Types are generated per module in their respective folders
          // definitions: {
          //   path: join(process.cwd(), 'src/graphql/graphql-types.ts'),
          // },
          // No manual resolvers - NestJS will auto-discover from @Query/@Mutation decorators
          // Schema is still defined in SDL files (SDL-first)
          playground,
          introspection,
          path: graphqlPath,
          context: ({ req, res }) => ({ req, res }),
          formatError: (error) => {
            // Format errors with proper structure
            const extensions = error.extensions || {};

            return {
              message: error.message,
              code: extensions.code || 'INTERNAL_SERVER_ERROR',
              path: error.path,
              extensions: {
                code: extensions.code || 'INTERNAL_SERVER_ERROR',
                statusCode: extensions.statusCode,
                validationErrors: extensions.validationErrors,
              },
            };
          },
        };
      },
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    ResourcesModule,
  ],
  providers: [
    AuthResolver,
    ProjectsResolver,
    ResourcesResolver,
    DateTimeScalar,
    EmailScalar,
    NonEmptyStringScalar,
    PositiveIntScalar,
    NonNegativeIntScalar,
    PasswordScalar,
    {
      provide: APP_FILTER,
      useClass: GraphqlExceptionFilter,
    },
  ],
  exports: [GraphQLModule],
})
export class GraphqlModule {}
