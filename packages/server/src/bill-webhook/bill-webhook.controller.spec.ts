import { Test, TestingModule } from '@nestjs/testing';
import { BillWebhookController } from './bill-webhook.controller';
import { BillWebhookService } from './bill-webhook.service';

describe('BillWebhookController', () => {
  let controller: BillWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillWebhookController],
      providers: [BillWebhookService],
    }).compile();

    controller = module.get<BillWebhookController>(BillWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
