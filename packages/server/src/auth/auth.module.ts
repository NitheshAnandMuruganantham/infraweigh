import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AtGuard } from 'src/common/guards/at-gaurd';
import { MailerService } from 'src/mailer/mailer.service';
import { AtStrategy } from './at.statagy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RtStrategy } from './rt.statagy';
import { ApiKeyStrategy } from './api.statagy';

import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    JwtModule.register({}),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    ApiKeyStrategy,
    MailerService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AuthModule {}
