import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RazorPayWebhookController } from './razor-pay-webhook.controller';
import { RazorPayWebhookService } from './razor-pay-webhook.service';

@Module({
  imports: [ConfigModule],
  controllers: [RazorPayWebhookController],
  providers: [RazorPayWebhookService],
})
export class RazorPayWebhookModule {}
