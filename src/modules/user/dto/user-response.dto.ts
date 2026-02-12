import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'John' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @Expose()
  email: string;
}
