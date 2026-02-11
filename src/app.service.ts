import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Welcome to NestJS REST API!';
  }

  getHealthStatus(): object {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'nestjs-api',
      version: '1.0.0',
    };
  }
}
