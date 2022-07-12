import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  await app.listen(parseInt(configService.get('PORT'), 10));

  const useEmulator = configService.get<boolean>('USE_EMULATOR');

  if (useEmulator) {
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099';
  }

  const adminConfig = configService.get<string>('FIREBASE_ADMIN_CONFIG');
  const adminConfigParsed = JSON.parse(adminConfig);

  admin.initializeApp({
    credential: admin.credential.cert(adminConfigParsed as ServiceAccount),
  });
}
bootstrap();
