import { Injectable } from '@nestjs/common';
import { MailerService as MailRootService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private mailService: MailRootService) {}
  async sendBillEmail(email: string, dt: any) {
    await this.mailService.sendMail({
      to: email,
      subject: 'new Bill created',
      template: 'newBill',
      context: {
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
    });
  }
  async sendPasswordResetEmail(email: string, link: string) {
    await this.mailService.sendMail({
      to: email,
      subject: 'password reset request',
      template: 'passwordReset',
      context: {
        link,
      },
    });
  }
}
