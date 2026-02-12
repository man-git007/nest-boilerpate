// src/modules/user/user.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { ApiSuccessResponse } from 'src/common/decorators/api-response.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiSuccessResponse(UserResponseDto, { isArray: true })
  @Serialize(UserResponseDto)
  findAll() {
    return this.userService.findAllUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('Received CreateUserDto:', createUserDto);
    return this.userService.createUser(createUserDto);
  }
}
