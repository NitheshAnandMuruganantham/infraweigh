import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserWebhookService } from './user-webhook.service';
import { UserWebhookController } from './user-webhook.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  controllers: [UserWebhookController],
  providers: [UserWebhookService],
})
export class UserWebhookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user-webhook');
  }
}
