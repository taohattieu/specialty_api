import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as expressBasicAuth from 'express-basic-auth';

const apiDocumentationCredentials = {
  name: 'admin',
  pass: 'abc',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Basic Auth cho Swagger
  app.use(
    '/api-json',
    expressBasicAuth({
      users: { [apiDocumentationCredentials.name]: apiDocumentationCredentials.pass },
      challenge: true,
    }),
  );

  app.use(passport.initialize());

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 8080;

  const config = new DocumentBuilder()
    .setTitle('Specialty Dish')
    .setDescription('The specialty API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
  console.info(`Server is running on ${port}`);
  console.info(`OpenAPI: http://localhost:${port}/api`);
}

bootstrap();
