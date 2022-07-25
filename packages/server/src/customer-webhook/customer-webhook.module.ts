import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomerWebhookService } from './customer-webhook.service';
import { CustomerWebhookController } from './customer-webhook.controller';

@Module({
  controllers: [CustomerWebhookController],
  providers: [CustomerWebhookService],
})
export class CustomerWebhookModule {}
