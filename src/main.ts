import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import * as compression from 'compression';
import { BackofficeModule } from './modules/backoffice/backoffice.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console,
  });
  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('PetShop API')
    .setDescription('API do curso de NestJS')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [BackofficeModule],
  });
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
