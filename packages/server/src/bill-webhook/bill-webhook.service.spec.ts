import { Test, TestingModule } from '@nestjs/testing';
import { BillWebhookService } from './bill-webhook.service';

describe('BillWebhookService', () => {
  let service: BillWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillWebhookService],
    }).compile();

    service = module.get<BillWebhookService>(BillWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
