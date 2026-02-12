import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAppConfig } from './config/app.config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAppConfig();
  const port = appConfig.port || 3000;

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  setupSwagger(app); // ✅ Removed await

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${port}`);
  console.log(`📚 Swagger docs: ${await app.getUrl()}/api/v1/docs`);
}

// ✅ Handle the promise properly
bootstrap().catch((error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});
