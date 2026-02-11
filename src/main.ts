import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { getAppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAppConfig();
  const port = appConfig.port || 3000;

  const prisma = app.get(PrismaService);
  await prisma.$connect();
  console.log('✅ Database connected successfully!');
  const result = await prisma.$queryRaw`SELECT 1 as test`;
  console.log(`🔍 Test query result:`, result);

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${port}`);
}
bootstrap();
