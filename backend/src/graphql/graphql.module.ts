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
import { AuthResolver } from './resolvers';
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
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
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
    {
      provide: APP_FILTER,
      useClass: GraphqlExceptionFilter,
    },
  ],
  exports: [GraphQLModule],
})
export class GraphqlModule {}
