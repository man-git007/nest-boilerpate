import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message: string | string[] = 'Internal server error';
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorType = 'InternalServerError';
    const errors: Record<string, any> | null = null;

    const errorCode: string | null = null;
    // Handle HttpException (NestJS exceptions)
    if (exception instanceof HttpException) {
      response.status(statusCode).json({
        status: false,
        message,
        statusCode,
        data: null,
        error: {
          type: errorType,
          code: errorCode,
        },
        timestamp: new Date().toISOString(),
        ...(errors ? { errors } : {}),
        // Include stack trace only in development
      });
    }
  }
}
