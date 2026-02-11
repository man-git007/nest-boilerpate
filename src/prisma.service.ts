
import { Injectable } from '@nestjs/common';
import { PrismaClient } from './database/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { getDatabaseConfig } from './config/database.config';

@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        const dbConfig = getDatabaseConfig();

        const adapter = new PrismaPg({database: dbConfig.database, password: dbConfig.password });
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
