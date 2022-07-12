import { Controller, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserWebhookService } from './user-webhook.service';

@Controller('user-webhook')
export class UserWebhookController {
  constructor(private readonly userWebhookService: UserWebhookService) {}

  @Post()
  create(@Body() body: any) {
    return this.userWebhookService.create(body);
  }

  @Post('admin')
  createAdmin(@Body() body: any) {
    return this.userWebhookService.newAdmin(body);
  }

  @Delete()
  delete(@Body() body: any) {
    return this.userWebhookService.delete(body);
  }

  @Patch()
  update(@Body() body: any) {
    return this.userWebhookService.update(body);
  }
}
