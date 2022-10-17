import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { Public } from '../common/decorators';
import { ApiKeyAuthGuard } from '../common/guards/api-guard';
import { CreateIssueWebhookDto } from './dto/create-issue-webhook.dto';

@Controller('webhook')
@Public()
@UseGuards(ApiKeyAuthGuard)
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('issues/create')
  createIssue(@Body() body: CreateIssueWebhookDto) {
    return this.webhookService.createIssue(body);
  }

  @Post('issues/update')
  updateIssue(@Body() body: CreateIssueWebhookDto) {
    return this.webhookService.resolveIssue(body);
  }
}
