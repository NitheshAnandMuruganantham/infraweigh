import { Test, TestingModule } from '@nestjs/testing';
import { RazorPayWebhookService } from './razor-pay-webhook.service';

describe('RazorPayWebhookService', () => {
  let service: RazorPayWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RazorPayWebhookService],
    }).compile();

    service = module.get<RazorPayWebhookService>(RazorPayWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
