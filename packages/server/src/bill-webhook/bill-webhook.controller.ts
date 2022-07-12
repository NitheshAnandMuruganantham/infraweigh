import { Body, Controller, Post } from '@nestjs/common';
import { BillWebhookService } from './bill-webhook.service';

@Controller('bill-webhook')
export class BillWebhookController {
  constructor(private readonly billWebhookService: BillWebhookService) {}
  @Post()
  async create(@Body() body: any) {
    return this.billWebhookService.create(body);
  }
}
