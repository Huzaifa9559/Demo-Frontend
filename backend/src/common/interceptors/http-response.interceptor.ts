import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseResponse } from '../utils/response.util';

@Injectable()
export class HttpResponseInterceptor<T>
  implements NestInterceptor<T, ApiBaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiBaseResponse<T>> {
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
}

