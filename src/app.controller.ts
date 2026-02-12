import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({ status: 200, description: 'Welcome message' })
  getHello(): string {
    return this.appService.getWelcomeMessage();
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth(): object {
    return this.appService.getHealthStatus();
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Protected route example' })
  @ApiResponse({
    status: 200,
    description: 'Access granted to protected route',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProtected(): object {
    return {
      message: 'You have access to this protected route!',
      timestamp: new Date().toISOString(),
    };
  }
}
