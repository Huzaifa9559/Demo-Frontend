import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GraphqlResponseInterceptor<T> implements NestInterceptor<T, T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    // GraphQL responses follow the GraphQL specification:
    // { data: {...}, errors: [...] }
    // Errors are handled by GraphqlExceptionFilter
    // We return data as-is since GraphQL has its own response structure
    return next.handle().pipe(
      map((data) => {
        // GraphQL resolvers return data directly
        // The GraphQL engine wraps it in { data: {...} } format
        // Errors go into the errors array automatically
        return data;
      }),
    );
  }
}
