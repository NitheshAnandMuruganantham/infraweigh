import { Controller, Post, Body, Patch } from '@nestjs/common';
import { CustomerWebhookService } from './customer-webhook.service';

@Controller('customer-webhook')
export class CustomerWebhookController {
  constructor(
    private readonly customerWebhookService: CustomerWebhookService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.customerWebhookService.create(body);
  }

  @Patch()
  update(@Body() body: any) {
    return this.customerWebhookService.update(body);
  }
}
