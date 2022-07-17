import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWebhookService } from './customer-webhook.service';

describe('CustomerWebhookService', () => {
  let service: CustomerWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerWebhookService],
    }).compile();

    service = module.get<CustomerWebhookService>(CustomerWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
