// src/common/guards/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract API key from headers
    const apiKey = this.extractApiKeyFromRequest(request);

    if (!apiKey) {
      this.logger.warn(
        `Authentication failed: No API key provided for route ${request.path}`,
      );
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'API key is required',
        error: 'Unauthorized',
      });
    }

    // Validate the API key
    if (apiKey !== '123123') {
      this.logger.warn(
        `Authentication failed: Invalid API key provided for route ${request.path}`,
      );
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid API key',
        error: 'Unauthorized',
      });
    }

    // Attach user information to the request object

    this.logger.log(`Authentication successful for route ${request.path}`);
    return true;
  }

  private extractApiKeyFromRequest(request: Request): string | undefined {
    // Check query parameter (alternative method)
    if (request.query['api_key']) {
      return request.query['api_key'] as string;
    }

    return undefined;
  }
}
