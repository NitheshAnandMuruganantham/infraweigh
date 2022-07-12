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
      return await this.client.messages.create({
        body: `
        thank you for choosing ${dt.weighbridge.display_name || ''}!
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
        to: phone,
        from: this.config.get('TWILIO_PHONE'),
      });
    } catch (e) {
      return e;
    }
  }
}
