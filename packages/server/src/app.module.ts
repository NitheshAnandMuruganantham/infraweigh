import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BillWebhookModule } from './bill-webhook/bill-webhook.module';
import { CustomerWebhookModule } from './customer-webhook/customer-webhook.module';
import { MailerService } from './mailer/mailer.service';
import { MessengerService } from './messenger/messenger.service';
import { RazorPayWebhookModule } from './razor-pay-webhook/razor-pay-webhook.module';
import { UserWebhookModule } from './user-webhook/user-webhook.module';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserWebhookModule,
    CustomerWebhookModule,
    RazorPayWebhookModule,
    BillWebhookModule,
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
          from: config.get('SMTP_USER'),
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
  ],
  controllers: [AppController],
  providers: [AppService, MailerService, MessengerService],
})
export class AppModule {}
