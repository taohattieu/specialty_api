import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


const apiDocumentationCredentials = {
  name: 'admin',
  pass: 'abc',
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
const httpAdapter = app.getHttpAdapter();

  httpAdapter.use('/api', (req, res, next) => {
    const parseAuthHeader = (input: string): { name: string; pass: string } => {
      const [, encodedPart] = input.split(' ');
      const buff = Buffer.from(encodedPart, 'base64');
      const text = buff.toString('ascii');
      const [name, pass] = text.split(':');
      return { name, pass };
    };

    const unauthorizedResponse = () => {
      res.status(401);
      res.set('WWW-Authenticate', 'Basic');
      next();
    };

    if (!req.headers.authorization) {
      return unauthorizedResponse();
    }

    const credentials = parseAuthHeader(req.headers.authorization);
    if (
      credentials?.name !== apiDocumentationCredentials.name ||
      credentials?.pass !== apiDocumentationCredentials.pass
    ) {
      return unauthorizedResponse();
    }
    next();
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('Specialty Dish')
    .setDescription('The specialty API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      // Lưu lại authorization data và sẽ không bị mất khi refresh lại trang
      persistAuthorization: true,
    },
  });
  await app.listen(8080);
  console.info(`Server is running on 8080`);
  console.info(`OpenAPI: http://localhost:8080/api`);
}

bootstrap();
