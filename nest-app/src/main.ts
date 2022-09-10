import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Vouchers')
  .setDescription('Voucher Endpoint for E-commerce Coderhouse-Backend')
  .setVersion('1.0.0')
  .addTag('vouchers')
  .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document)
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
