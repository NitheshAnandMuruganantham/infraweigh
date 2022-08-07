import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

@Injectable()
export class RazorPayWebhookService {
  constructor(private config: ConfigService, private prisma: PrismaService) {}

  async handleWebhook(body: any, headers: any) {
    try {
      console.log('body', body);
      console.log('headers', headers);

      const secret = this.config.get<string>('RAZORPAY_WEBHOOK_SECRET');

      const isValid = await validateWebhookSignature(
        JSON.stringify(body),
        headers['x-razorpay-signature'],
        secret,
      );
      if (!isValid) {
        return {
          status: 'error',
          message: 'invalid webhook signiture',
        };
      } else {
        await this.prisma.bill.update({
          where: {
            id: body.payload.order.entity.receipt,
          },
          data: {
            paid: body.payload.order.entity.status === 'paid' ? true : false,
          },
        });
        return {
          status: 'ok',
        };
      }
    } catch (error) {
      return {
        status: 'error',
        error: error.message,
      };
    }
  }
}
