import {
  ConsoleLogger,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getBillDetails } from 'src/razor-pay-webhook/graphqlRequest';
import crossFetch from 'cross-fetch';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Razorpay = require('razorpay');

@Injectable()
export class BillWebhookService {
  constructor(private config: ConfigService) {}
  async create(body: any) {
    const razorpay_id = this.config.get<string>('RAZORPAY_ID');
    const razorpay_secret = this.config.get<string>('RAZORPAY_KEY');
    const admin_secret = this.config.get<string>('ADMIN_SECRET');
    const hasura_url = this.config.get<string>('HASURA_URL');
    return crossFetch(`${hasura_url}/v1/graphql`, {
      method: 'POST',
      headers: {
        'x-hasura-admin-secret': admin_secret,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getBillDetails,
        variables: {
          billByPkId: body.event.data.new.id,
        },
      }),
    })
      .then(async (response) => response.json())
      .then(async (response) => {
        const dt = response.data.bill_by_pk;
        if (dt.paid_by === 'cash') {
          await crossFetch(`${hasura_url}/v1/graphql`, {
            method: 'POST',
            headers: {
              'x-hasura-admin-secret': admin_secret,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
              mutation updateBill(
                $pkColumns: bill_pk_columns_input!
                $set: bill_set_input
              ) {
                update_bill_by_pk(pk_columns: $pkColumns, _set: $set) {
                  id
                }
              }
            `,
              variables: {
                set: {
                  payment_initiated: true,
                  paid: true,
                },
                pkColumns: {
                  id: dt.id,
                },
              },
            }),
          });
          return {
            status: 'ok',
          };
        } else {
          const razorpay = new Razorpay({
            key_id: razorpay_id,
            key_secret: razorpay_secret,
          });

          const order = await razorpay.orders.create({
            amount: parseInt(dt.charges.split('$')[1], 10) * 100,
            receipt: dt.id,
            currency: 'INR',
            transfers: [
              {
                account: dt.tenent.razorpay_id,
                amount: parseInt(dt.charges.split('$')[1], 10) * 100,
                currency: 'INR',
                notes: {
                  branch: dt.weighbridge.name,
                  name: dt.tenent.name,
                },
                on_hold: 0,
              },
            ],
          });

          return await crossFetch(`${hasura_url}/v1/graphql`, {
            method: 'POST',
            headers: {
              'x-hasura-admin-secret': admin_secret,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
                  mutation updateBill(
                    $pkColumns: bill_pk_columns_input!
                    $set: bill_set_input
                  ) {
                    update_bill_by_pk(pk_columns: $pkColumns, _set: $set) {
                      id
                    }
                  }
                  `,
              variables: {
                set: {
                  order_id: order.id,
                  payment_initiated: true,
                },
                pkColumns: {
                  id: dt.id,
                },
              },
            }),
          })
            .then((response) => response.json())
            .then(() => {
              return {
                status: 'ok',
              };
            });
        }
      });
  }

  sendMessageAndMail = async ({
    dt,
    id,
    prefix,
    admin,
  }: {
    id: string;
    dt: {
      charges: string;
      vehicle: {
        name: string;
      };
      phone: string;
      email: string;
      weighbridge: {
        display_name: string;
      };
      vehicle_number: string;
      material: {
        name: string;
      };
      created_at: string;
      scale_weight: string;
      tare_weight: string;
      second_weight: boolean;
    };
    prefix: string;
    admin: any;
  }) => {
    await admin
      .firestore()
      .doc(`messages/${id}-${prefix}`)
      .set({
        to: dt.phone,
        body: `thank you for choosing ${dt.weighbridge.display_name || ''}!
          vehicle number: ${dt.vehicle_number}
          material: ${dt.material.name}
          time: ${new Date(dt.created_at).toLocaleString()}
          scale weight: ${dt.scale_weight}
          tare weight: ${dt.tare_weight || ''}
          net weight: ${
            dt.second_weight
              ? Math.abs(
                  parseInt(dt.tare_weight || '0', 10) -
                    parseInt(dt.scale_weight || '0', 10),
                )
              : ''
          }

          `,
      });
    await admin
      .firestore()
      .doc(`mail/${id}-${prefix}`)
      .set({
        to: dt.email,
        template: {
          name: 'bill',
          data: {
            Weighbridge_name: dt.weighbridge.display_name,
            address: '',
            vehicle_number: dt.vehicle_number,
            material: dt.material.name,
            date: `${new Date(dt.created_at).toLocaleString()}`,
            vehicle: dt.vehicle.name,
            scale_weight: dt.scale_weight,
            tare_weight: dt.tare_weight || '',
            net_weight: `${
              dt.second_weight
                ? Math.abs(
                    parseInt(dt.tare_weight || '0', 10) -
                      parseInt(dt.scale_weight || '0', 10),
                  )
                : ''
            }`,
            charges: dt.charges,
          },
        },
        subject: `thanks for choosing ${dt.weighbridge.display_name}`,
        html: `thank you for choosing ${dt.weighbridge.display_name || ''}!
          vehicle number: ${dt.vehicle_number}
          material: ${dt.material.name}
          time: ${new Date(dt.created_at).toLocaleString()}
          scale weight: ${dt.scale_weight}
          tare weight: ${dt.tare_weight || ''}
          net weight: ${
            dt.second_weight
              ? Math.abs(
                  parseInt(dt.tare_weight || '0', 10) -
                    parseInt(dt.scale_weight || '0', 10),
                )
              : ''
          }
          `,
      });
  };
}
