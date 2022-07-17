import { Test, TestingModule } from '@nestjs/testing';
import { RazorPayWebhookController } from './razor-pay-webhook.controller';

describe('RazorPayWebhookController', () => {
  let controller: RazorPayWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RazorPayWebhookController],
    }).compile();

    controller = module.get<RazorPayWebhookController>(RazorPayWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
