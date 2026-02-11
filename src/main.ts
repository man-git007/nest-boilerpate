import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = app.get(PrismaService);
  await prisma.$connect();
  console.log('✅ Database connected successfully!');
  const result = await prisma.$queryRaw`SELECT 1 as test`;
  console.log(`🔍 Test query result:`, result);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
