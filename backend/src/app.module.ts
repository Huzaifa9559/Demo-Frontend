import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ResourcesModule } from './resources/resources.module';
import { GraphqlModule } from './graphql/graphql.module';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import { ShopifyModule } from './shopify/shopify.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    GraphqlModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    ResourcesModule,
    ShopifyModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

