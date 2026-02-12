import { Prisma } from '../../generated/prisma/client';

export type TransactionClient = Prisma.TransactionClient;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  error: any;
  timestamp: string;
}
