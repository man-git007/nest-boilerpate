import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UsersRepository } from './users.repository.interface';
import { CreateUserParams } from '../types/user.types';

@Injectable()
export class UsersPrismaRepository extends UsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: CreateUserParams): Promise<User> {
    const { name, email } = data;

    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
