// src/modules/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Serialize } from '../../common/interceptors/serialize.interceptor';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all registered users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    schema: {
      example: {
        success: true,
        data: [
          {
            id: 1,
            name: 'mansi',
            email: 'asd112@gmail.com',
          },
        ],
        message: 'Success',
        timestamp: '2026-02-12T11:07:46.629Z',
        path: '/api/users',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
    schema: {
      example: {
        statusCode: 401,
        message: 'API key is required',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth()
  @ApiSecurity('api-key')
  @Serialize(UserResponseDto)
  findAll() {
    return this.userService.findAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with name and email',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data to create',
    required: true,
    examples: {
      example1: {
        summary: 'Create user',
        value: {
          name: 'mansi',
          email: 'asd112@gmail.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          email: 'asd112@gmail.com',
          name: 'mansi',
          createdAt: '2026-02-12T10:43:45.197Z',
          updatedAt: '2026-02-12T10:43:45.197Z',
        },
        message: 'Success',
        timestamp: '2026-02-12T10:43:45.219Z',
        path: '/api/users',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation failed',
    schema: {
      example: {
        statusCode: 400,
        message: ['email must be an email', 'name should not be empty'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'Email already registered',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing API key',
    schema: {
      example: {
        statusCode: 401,
        message: 'API key is required',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth()
  @ApiSecurity('api-key')
  @Serialize(UserResponseDto)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
