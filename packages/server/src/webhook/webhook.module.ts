import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { MessengerService } from '../messenger/messenger.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, MessengerService],
})
export class WebhookModule {}
