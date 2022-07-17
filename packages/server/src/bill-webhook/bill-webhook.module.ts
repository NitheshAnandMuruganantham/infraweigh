import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BillWebhookService } from './bill-webhook.service';
import { BillWebhookController } from './bill-webhook.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [BillWebhookController],
  providers: [BillWebhookService],
})
export class BillWebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user-webhook');
  }
}
