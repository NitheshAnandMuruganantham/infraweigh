import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as cokkieparser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.use(cokkieparser());
  app.enableCors({
    origin: [
      configService.getOrThrow<string>('FRONTEND_URL'),
      configService.getOrThrow<string>('CUSTOMER_URL'),
    ],
    credentials: true,
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const firebase_Service = JSON.parse(
    configService.getOrThrow<any>('FIREBASE_SERVICE'),
  );
  admin.initializeApp({
    credential: admin.credential.cert(firebase_Service),
  });

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  await app.listen(parseInt(configService.get('PORT'), 10));
}
bootstrap();
