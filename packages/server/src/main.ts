import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from 'nestjs-prisma';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.use(cookieParser(configService.get<string>('SESSION_SECRET')));
  app.enableCors({
    origin: ['http://localhost:8000'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  await app.listen(parseInt(configService.get('PORT'), 10));
}
bootstrap();
