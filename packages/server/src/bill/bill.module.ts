import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { S3Service } from 'src/s3/s3.service';
import { MessengerService } from 'src/messenger/messenger.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [BillController],
  providers: [BillService, S3Service, MessengerService, MailerService],
})
export class BillModule {}
