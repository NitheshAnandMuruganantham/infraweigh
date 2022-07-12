import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWebhookController } from './customer-webhook.controller';
import { CustomerWebhookService } from './customer-webhook.service';

describe('CustomerWebhookController', () => {
  let controller: CustomerWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerWebhookController],
      providers: [CustomerWebhookService],
    }).compile();

    controller = module.get<CustomerWebhookController>(
      CustomerWebhookController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
