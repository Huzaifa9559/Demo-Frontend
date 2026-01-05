import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseResponse } from '../utils/response.util';

/**
 * Unified response interceptor that handles both HTTP and GraphQL contexts
 * - HTTP: Wraps responses in standard format { success, error, data }
 * - GraphQL: Returns data as-is (GraphQL has its own response structure)
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiBaseResponse<T> | T
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiBaseResponse<T> | T> {
    const contextType = context.getType();

    // Handle HTTP/REST requests
    if (contextType === 'http') {
      return next.handle().pipe(
        map((data) => {
          // If the response is already in the standard format, return it as-is
          if (
            data &&
            typeof data === 'object' &&
            'success' in data &&
            'error' in data &&
            'data' in data
          ) {
            return data as ApiBaseResponse<T>;
          }

          // Otherwise, wrap it in the standard success response format
          return {
            success: true,
            error: null,
            data: data,
          };
        }),
      );
    }

    // Handle GraphQL requests - return data as-is
    // GraphQL has its own response structure: { data: {...}, errors: [...] }
    // Errors are handled by GraphqlExceptionFilter
    return next.handle().pipe(map((data) => data));
  }
}
