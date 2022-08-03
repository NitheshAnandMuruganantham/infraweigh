import { Body, Controller, Headers, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { RazorPayWebhookService } from './razor-pay-webhook.service';

@Controller('razor-pay-webhook')
export class RazorPayWebhookController {
  constructor(private razorpayService: RazorPayWebhookService) {}
  @Public()
  @Post()
  async handleWebhook(@Body() body: any, @Headers() headers: any) {
    return this.razorpayService.handleWebhook(body, headers);
  }
}
