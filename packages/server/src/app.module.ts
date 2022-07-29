import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MessengerService } from './messenger/messenger.service';
import { RazorPayWebhookModule } from './razor-pay-webhook/razor-pay-webhook.module';
import { TwilioModule } from 'nestjs-twilio';
import { PrismaModule } from 'nestjs-prisma';
import { BillModule } from './bill/bill.module';
import { S3Service } from './s3/s3.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RazorPayWebhookModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          secure: true,
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `no-replay <${config.get('DEFAULT_SENDER')}>`,
        },
        template: {
          dir: join(__dirname, './mailer/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        accountSid: config.get('TWILIO_ACCOUNT_ID'),
        authToken: config.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    MailerModule,
    BillModule
  ],
  controllers: [AppController],
  providers: [AppService, MessengerService, S3Service],
})
export class AppModule {}
