import { Test, TestingModule } from '@nestjs/testing';
import { UserWebhookService } from './user-webhook.service';

describe('UserWebhookService', () => {
  let service: UserWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWebhookService],
    }).compile();

    service = module.get<UserWebhookService>(UserWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
