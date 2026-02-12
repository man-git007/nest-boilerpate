// src/modules/user/dto/user-response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'mansi' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'asd112@gmail.com' })
  @Expose()
  email: string;

  @ApiPropertyOptional({ example: '2026-02-12T10:43:45.197Z' })
  @Expose()
  createdAt?: Date;

  @ApiPropertyOptional({ example: '2026-02-12T10:43:45.197Z' })
  @Expose()
  updatedAt?: Date;
}
