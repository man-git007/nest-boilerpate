import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * SETS UP SWAGGER DOCUMENTATION AND APPLIES BASIC AUTH PROTECTION
 * ON THE SWAGGER UI ROUTE (/API/V1/DOCS).
 *
 * @param app
 */
export const setupSwagger = (app: INestApplication) => {
  /**
   * SWAGGER DOCUMENTATION
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest Boiler Plate API Documentation')
    .setDescription(
      'This is the API documentation for the NestJS boilerplate project. It provides details about the available endpoints, request/response formats, and authentication requirements.',
    )
    .setVersion('1.0')
    .addTag('Nest Boiler Plate')
    .build();

  // CREATE AND SERVE THE SWAGGER DOCUMENT
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document);
};
