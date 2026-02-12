import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from '../../config/database.config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [dbConfig],
      isGlobal: true,
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
