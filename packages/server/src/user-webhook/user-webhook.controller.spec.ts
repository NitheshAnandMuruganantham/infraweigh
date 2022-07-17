import { Test, TestingModule } from '@nestjs/testing';
import { UserWebhookController } from './user-webhook.controller';
import { UserWebhookService } from './user-webhook.service';

describe('UserWebhookController', () => {
  let controller: UserWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWebhookController],
      providers: [UserWebhookService],
    }).compile();

    controller = module.get<UserWebhookController>(UserWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
