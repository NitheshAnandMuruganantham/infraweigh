import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AtGuard } from 'src/common/guards/at-gaurd';
import { MailerService } from 'src/mailer/mailer.service';
import { ApiKeyStrategy } from './apiKey.strategy';
import { AtStrategy } from './at.statagy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RtStrategy } from './rt.statagy';
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    ApiKeyStrategy,
    AtStrategy,
    RtStrategy,
    MailerService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AuthModule {}
