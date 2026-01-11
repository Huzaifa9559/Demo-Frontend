import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  });

  //Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          constraints: error.constraints,
          messages: error.constraints ? Object.values(error.constraints) : [],
        }));
        return new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global response interceptor (handles both HTTP and GraphQL)
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}${graphqlPath}`);
}

bootstrap();
