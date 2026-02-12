import { User } from 'src/generated/prisma/client';
import { TransactionClient } from 'src/common/types/common.types';
import { CreateUserParams } from '../types/user.types';

/**
 * Users Repository Abstract Class
 * Defines the contract for user data access operations
 */
export abstract class UsersRepository {
  abstract create(
    data: CreateUserParams,
    tx?: TransactionClient,
  ): Promise<User>;

  abstract findAll(): Promise<User[]>;
}
