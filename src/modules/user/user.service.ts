// src/modules/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../../generated/prisma/client';
import { UsersRepository } from './repository';
import { CreateUserParams } from './types/user.types';
import { TransactionClient } from 'src/common/types/common.types';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(
    data: CreateUserParams,
    tx?: TransactionClient,
  ): Promise<User> {
    return await this.usersRepository.create(data, tx);
  }

  findAllUsers(): Promise<User[]> {
    // throw new Error('Method not implementeassd.'); // Placeholder for actual implementation
    return this.usersRepository.findAll();
  }

  public users: any[] = [];
}
