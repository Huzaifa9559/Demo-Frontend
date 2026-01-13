import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphqlExceptionFilter } from './common/filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Global exception filter
  app.useGlobalFilters(new GraphqlExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}${graphqlPath}`);
}

bootstrap();
