import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

export interface ValidationError {
  field: string;
  constraints?: Record<string, string>;
  messages: string[];
}

export interface GraphQLErrorResponse {
  message: string;
  code: string;
  path?: readonly (string | number)[];
  validationErrors?: ValidationError[];
  statusCode?: number;
}

@Catch()
export class GraphqlExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(exception: unknown, host?: ArgumentsHost): GraphQLError {
    // All requests are GraphQL - no HTTP context handling needed
    // Handle HttpException (from ValidationPipe, service layer, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const errorResponse: GraphQLErrorResponse = {
        message: 'An error occurred',
        code: this.getErrorCode(status),
        statusCode: status,
      };

      if (typeof exceptionResponse === 'string') {
        errorResponse.message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const errorObj = exceptionResponse as Record<string, any>;

        // Handle validation errors from ValidationPipe
        if (errorObj.errors && Array.isArray(errorObj.errors)) {
          errorResponse.message = errorObj.message || 'Validation failed';
          errorResponse.code = 'VALIDATION_ERROR';
          errorResponse.validationErrors = errorObj.errors.map(
            (error: any) => ({
              field: error.field || error.property || 'unknown',
              constraints: error.constraints || {},
              messages:
                error.messages ||
                (error.constraints
                  ? Object.values(error.constraints)
                  : [error.message || 'Validation failed']),
            }),
          );
        }
        // Handle validation errors from class-validator (array of messages)
        else if (errorObj.message && Array.isArray(errorObj.message)) {
          errorResponse.message = 'Validation failed';
          errorResponse.code = 'VALIDATION_ERROR';
          errorResponse.validationErrors = errorObj.message.map(
            (msg: string) => ({
              field: 'unknown',
              messages: [msg],
            }),
          );
        } else {
          errorResponse.message =
            errorObj.message ||
            (exception as any).message ||
            errorResponse.message;
        }
      }

      const graphqlError = new GraphQLError(errorResponse.message, {
        extensions: {
          code: errorResponse.code,
          statusCode: errorResponse.statusCode,
          validationErrors: errorResponse.validationErrors,
        },
      });

      return graphqlError;
    }

    // Handle standard Error
    if (exception instanceof Error) {
      return new GraphQLError(exception.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      });
    }

    // Handle unknown errors
    return new GraphQLError('Internal server error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'VALIDATION_ERROR';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}
