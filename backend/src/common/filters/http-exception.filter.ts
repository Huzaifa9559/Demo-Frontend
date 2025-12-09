import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { buildErrorResponse } from '../utils/response.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const errorObj = exceptionResponse as Record<string, any>;
        message = errorObj.message || (exception as any).message || message;
        details = errorObj.error || errorObj.details;
      } else {
        message = (exception as any).message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      details = exception.stack;
    }

    const errorResponse = buildErrorResponse(message, details);

    response.status(status).json(errorResponse);
  }
}

