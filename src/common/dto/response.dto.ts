import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  data: T;
  message: string;
  timestamp: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    example: 401,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Invalid credentials',
    description: 'Error message describing what went wrong',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error type or category',
  })
  error: string;

  @ApiProperty({
    example: '2026-01-02T05:52:34.178Z',
    description: 'Timestamp when the error occurred',
    format: 'date-time',
  })
  timestamp: string;

  @ApiProperty({
    example: '/api/v1/auth/login',
    description: 'API endpoint path where the error occurred',
  })
  path: string;
}

export class SuccessResponseDto<T> extends BaseResponseDto<T> {
  constructor(data: T, message = 'Success') {
    super();
    this.data = data;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}
