import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import crossFetch from 'cross-fetch';
import { RazorPayWebhookMutation } from './graphqlRequest';

@Injectable()
export class RazorPayWebhookService {
  constructor(private config: ConfigService) {}

  async handleWebhook(body: any, headers: any) {
    try {
      console.log('body', body);
      console.log('headers', headers);

      const secret = this.config.get<string>('RAZORPAY_WEBHOOK_SECRET');
      const admin_secret = this.config.get<string>('ADMIN_SECRET');
      const hasura_url = this.config.get<string>('HASURA_URL');
      const isValid = await validateWebhookSignature(
        JSON.stringify(body),
        headers['x-razorpay-signature'],
        '6D5970337336763979244226452948404D635166546A576E5A7234743777217A25432A462D4A614E645267556B58703273357638782F413F4428472B4B625065',
      );
      if (!isValid) {
        throw new BadRequestException(
          'Invalid webhook signature',
          HttpStatus.BAD_REQUEST.toString(),
        );
      } else {
        await crossFetch(`${hasura_url}/v1/graphql`, {
          method: 'POST',
          headers: {
            'x-hasura-admin-secret': admin_secret,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: RazorPayWebhookMutation,
            variables: {
              set: {
                paid:
                  body.payload.order.entity.status === 'paid' ? true : false,
                payment_initiated: true,
              },
              pkColumns: {
                id: body.payload.order.entity.receipt,
              },
            },
          }),
        }).then((res) => res.json());
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
