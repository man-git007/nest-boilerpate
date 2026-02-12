import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { dbConfig } from '../../config/database.config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const config = dbConfig();
    console.log('Database configuration:', config); // Log the entire config for debugging

    const adapter = new PrismaPg({
      database: config.database,
      password: config.password,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
