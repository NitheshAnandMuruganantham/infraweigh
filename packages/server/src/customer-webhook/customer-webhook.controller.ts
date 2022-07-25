import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { WebHookGuard } from 'src/common/guards/webhook-guard';
import { CustomerWebhookService } from './customer-webhook.service';

@Controller('customer-webhook')
export class CustomerWebhookController {
  constructor(
    private readonly customerWebhookService: CustomerWebhookService,
  ) {}
  @Public()
  @UseGuards(WebHookGuard)
  @Post()
  create(@Body() body: any) {
    return this.customerWebhookService.create(body);
  }

  @Public()
  @UseGuards(WebHookGuard)
  @Patch()
  update(@Body() body: any) {
    return this.customerWebhookService.update(body);
  }
}
