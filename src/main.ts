import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') ?? true,
    credentials: true,
  });

  // Ensure uploads dir exists (dev/prod)
  mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  const swaggerPath = 'api/docs';
  const config = new DocumentBuilder()
    .setTitle('Selam Collaboration API')
    .setDescription(
      'NestJS REST API for chat + uploads (Socket.IO is separate).',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    // Use a relative server so Swagger works on localhost, ngrok, etc.
    .addServer('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(Number(process.env.PORT ?? 4000));
}
bootstrap();
