import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class MessengerService {
  constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    private config: ConfigService,
  ) {}

  async sendSMS(phone: string, dt: any) {
    try {
      const net_weight = dt.second_weight
        ? Math.abs(
            parseInt(dt.tare_weight || '0', 10) -
              parseInt(dt.scale_weight || '0', 10),
          )
        : '';
      const data = await this.client.messages.create({
        body:
          `thank you for choosing ${dt.weighbridge.display_name || ''}!\n` +
          `vehicle number: ${dt.vehicle_number}\n` +
          `material: ${dt.material.name}\n` +
          `time: ${new Date(dt.created_at).toLocaleString()}\n` +
          `scale weight: ${dt.scale_weight}\n` +
          `tare weight: ${dt.tare_weight || ''}\n` +
          `net weight: ${net_weight}`,
        to: phone,
        from: this.config.get('TWILIO_PHONE'),
      });
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async sendRawSMS(phone: string, dt: any) {
    try {
      const data = await this.client.messages.create({
        body: dt,
        to: phone,
        from: this.config.get('TWILIO_PHONE'),
      });
      return data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
