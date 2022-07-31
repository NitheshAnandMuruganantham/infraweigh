import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { HttpsHasuraIoJwtClaims } from 'src/auth/types';
import { S3Service } from 'src/s3/s3.service';
import * as Razorpay from 'razorpay';
import { CreateBillDto } from './bill.dto';
import { v4 as uuid } from 'uuid';
import { MailerService } from 'src/mailer/mailer.service';
import { MessengerService } from 'src/messenger/messenger.service';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';

@Injectable()
export class BillService {
  constructor(
    private s3: S3Service,
    private prisma: PrismaService,
    private mailer: MailerService,
    private messenger: MessengerService,
    private config: ConfigService,
  ) {}
  async create(
    claims: HttpsHasuraIoJwtClaims,
    body: CreateBillDto,
    file: Array<Express.Multer.File>,
  ) {
    try {
      const id = uuid();
      const data = await Promise.all([
        this.prisma.bill.create({
          data: {
            id,
            vehicle_number: body.vehicle_number,
            material_id: body.material_id,
            vehicle_id: body.vehicle_id,
            customer_2_id: body.customer_2_id,
            customer_3_id: body.customer_3_id,
            customer_id: body.customer_id,
            driver_phone: body.driver_phone,
            charges: body.charges,
            reference_bill_id: !!body.tare_weight
              ? body.reference_bill_id
              : null,
            scale_weight: parseInt(`${body.scale_weight}`, 10),
            tare_weight: body.tare_weight
              ? parseInt(`${body.tare_weight}`, 10)
              : 0,
            tenent_id: claims['x-hasura-tenent-id'],
            second_weight: !!body.tare_weight,
            paid: body.paid_by === 'cash' ? true : false,
            weighbridge_id: claims['x-hasura-weighbridge-id'],
          },
          include: {
            tenents: true,
            weighbridge: true,
            vehicle: true,
            material: true,
            customer_bill_customer_2_idTocustomer: {
              select: {
                company_address: true,
                company_name: true,
                gst_in: true,
                name: true,
                phone: true,
                email: true,
              },
            },
            customer_bill_customer_3_idTocustomer: {
              select: {
                company_address: true,
                company_name: true,
                gst_in: true,
                name: true,
                phone: true,
                email: true,
              },
            },
            customer_bill_customer_idTocustomer: {
              select: {
                company_address: true,
                company_name: true,
                gst_in: true,
                name: true,
                phone: true,
                email: true,
              },
            },
          },
        }),
        this.s3.uploadBillImages(file, id),
      ]);
      let order_id = null;
      let payment_initiated = null;
      let paid = false;
      if (data[0].paid_by !== 'cash') {
        try {
          const razorpay = new Razorpay(this.config.get('RAZORPAY_SERVICE'));

          const order = await razorpay.orders.create({
            amount: parseInt(`${data[0].charges}`, 10) * 100,
            receipt: data[0].id,
            currency: 'INR',
            transfers: [
              {
                account: data[0].tenents.razorpay_id,
                amount: parseInt(`${data[0].charges}`, 10) * 100,
                currency: 'INR',
                notes: {
                  branch: data[0].weighbridge.name,
                  name: data[0].tenents.name,
                },
                on_hold: 0,
              },
            ],
          });
          order_id = order.id;
          payment_initiated = true;
          await this.prisma.bill.update({
            where: {
              id: data[0].id,
            },
            data: {
              order_id: order.id,
              payment_initiated: true,
            },
          });
        } catch (er) {}
      } else {
        paid = true;
        payment_initiated = true;
      }
      await Promise.all([
        data[0].customer_2_id
          ? this.mailer.sendBillEmail(
              data[0].customer_bill_customer_2_idTocustomer.email,
              data[0],
            )
          : null,
        data[0].customer_2_id
          ? this.messenger.sendSMS(
              data[0].customer_bill_customer_2_idTocustomer.phone,
              data[0],
            )
          : null,
      ]);
      await Promise.all([
        data[0].customer_3_id
          ? this.mailer.sendBillEmail(
              data[0].customer_bill_customer_3_idTocustomer.email,
              data[0],
            )
          : null,
        data[0].customer_3_id
          ? this.messenger.sendSMS(
              data[0].customer_bill_customer_3_idTocustomer.phone,
              data[0],
            )
          : null,
      ]);
      await Promise.all([
        data[0].customer_id
          ? this.mailer.sendBillEmail(
              data[0].customer_bill_customer_idTocustomer.email,
              data[0],
            )
          : null,
        data[0].customer_id
          ? this.messenger.sendSMS(
              data[0].customer_bill_customer_idTocustomer.phone,
              data[0],
            )
          : null,
      ]);
      const charges = `${data[0].charges}`;
      await admin
        .firestore()
        .doc(`bill/${id}`)
        .set({
          ..._.omit(data[0], ['charges', 'order_id', 'paid']),
          charges,
          paid,
          order_id,
          payment_initiated,
        })
        .catch((e) => {
          console.log(e);
        });
      return data;
    } catch (err) {
      console.log(err);

      throw new BadRequestException();
    }
  }
  async getBill(id: string) {
    const data = await this.prisma.bill.findUnique({
      where: {
        id,
      },
      include: {
        material: true,
        vehicle: true,
        weighbridge: {
          select: {
            name: true,
            address: true,
            display_name: true,
            phone: true,
            pin_code: true,
            logo: true,
            mail: true,
          },
        },
        tenents: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        customer_bill_customer_2_idTocustomer: true,
        customer_bill_customer_3_idTocustomer: true,
        customer_bill_customer_idTocustomer: true,
      },
    });
    const bucketUrl = await this.s3.getBillImageUrls(id);

    return {
      ...data,
      photos: bucketUrl,
    };
  }
}
