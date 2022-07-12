import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomerWebhookService } from './customer-webhook.service';
import { CustomerWebhookController } from './customer-webhook.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [CustomerWebhookController],
  providers: [CustomerWebhookService],
})
export class CustomerWebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user-webhook');
  }
}
