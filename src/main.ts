import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { mkdirSync } from 'fs';

function parseCorsOrigins(raw: string | undefined): true | string[] {
  if (!raw) return true;
  const origins = raw
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
  return origins.length > 0 ? origins : true;
}

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      'JWT_SECRET is required before starting the API (set it in .env)',
    );
  }

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
    origin: parseCorsOrigins(process.env.FRONTEND_URL),
    credentials: true,
  });

  // Ensure uploads dir exists (dev/prod)
  mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  const swaggerPath = 'api/docs';
  const config = new DocumentBuilder()
    .setTitle('Selam Collaboration API')
    .setDescription(
      'NestJS chat API with explicit channel and direct-chat routes (Socket.IO is separate).',
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
