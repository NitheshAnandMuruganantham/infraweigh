import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { MessengerService } from '../messenger/messenger.service';
import { CreateIssueWebhookDto } from './dto/create-issue-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    private prisma: PrismaService,
    private messenger: MessengerService,
  ) {}

  async createIssue(body: CreateIssueWebhookDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: body.user_id,
      },
      include: {
        tenents: {
          include: {
            user_tenents_maintainer_idTouser: true,
          },
        },
      },
    });
    const messageBody =
      `hello Mr/Mrs ${
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user.tenents.user_tenents_maintainer_idTouser.profile?.name || ''
      }\n` +
      `one of your client has raised a support query follows : \n` +
      `name: ${user.tenents.name}\n` +
      `user: ${
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user.profile?.name || ''
      }\n` +
      `severity: ${body.severity}\n` +
      `title: ${body.title}\n`;

    return this.messenger.sendRawSMS(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user.tenents.user_tenents_maintainer_idTouser.profile?.phone || '',
      messageBody,
    );
  }

  async resolveIssue(body: CreateIssueWebhookDto) {
    if (body.resolved) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: body.user_id,
        },
      });
      const messageBody =
        `hello Mr/Mrs ${
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          user.profile?.name || ''
        }\n` +
        `your issue titled ${body.title} have been successfully resolved by our your maintainer\n` +
        `if you still face the issue again raise the issue in the portal for further assistance\n`;

      return this.messenger.sendRawSMS(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user.profile?.phone || '',
        messageBody,
      );
    } else {
      return false;
    }
  }
}
