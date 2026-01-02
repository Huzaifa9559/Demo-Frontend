import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { ResourcesModule } from '../resources/resources.module';
import { AuthResolver } from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const graphqlPath = configService.get<string>('graphql.path') || '/graphql';
        const playground = configService.get<boolean>('graphql.playground') ?? true;
        const introspection = configService.get<boolean>('graphql.introspection') ?? true;

        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          playground,
          introspection,
          path: graphqlPath,
          context: ({ req, res }) => ({ req, res }),
          formatError: (error) => {
            console.log(error);
            return {
              message: error.message,
              code: error.extensions?.code,
              path: error.path,
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
  providers: [AuthResolver],
  exports: [GraphQLModule],
})
export class GraphqlModule {}

