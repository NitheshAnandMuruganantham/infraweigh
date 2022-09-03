import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(private config: ConfigService) {}
  AWS_S3_BUCKET = this.config.get<string>('BILL_BUCKET_NAME');
  s3 = new AWS.S3({
    ...JSON.parse(this.config.getOrThrow('AWS_SERVICE_CONFIG')),
    signatureVersion: 'v4',
    region: 'ap-south-1',
  });

  async uploadBillImages(files: Array<Express.Multer.File>, id: string) {
    return Promise.all([
      files[0] ? this.uploadBillImage(files[0], id) : null,
      files[1] ? this.uploadBillImage(files[1], id) : null,
      files[2] ? this.uploadBillImage(files[2], id) : null,
      files[3] ? this.uploadBillImage(files[3], id) : null,
    ]);
  }

  async uploadBillImage(file: Express.Multer.File, id: string) {
    const { originalname } = file;
    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET + `/bills/${id}`,
      originalname,
      file.mimetype,
    );
  }
  async uploadBillPdf(buffer: Buffer, id: string) {
    return await this.s3_upload(
      buffer,
      this.AWS_S3_BUCKET + `/invoices/${id}`,
      'invoice',
      'application/pdf',
    );
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    await this.s3
      .upload({
        Body: file,
        Bucket: bucket,
        Key: name,
        ContentType: mimetype,
        ContentDisposition: 'inline',
      })
      .promise();
    return this.s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: name,
      Expires: 60 * 60 * 12,
    });
  }
  async getBillImageUrls(id: string) {
    const ur1 = this.s3.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET + `/bills/${id}`,
      Key: '0.jpg',
      Expires: 60 * 60 * 12,
    });
    const ur2 = this.s3.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET + `/bills/${id}`,
      Key: '1.jpg',
      Expires: 60 * 60 * 12,
    });
    const ur3 = this.s3.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET + `/bills/${id}`,
      Key: '2.jpg',
      Expires: 60 * 60 * 12,
    });
    const ur4 = this.s3.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET + `/bills/${id}`,
      Key: '3.jpg',
      Expires: 60 * 60 * 12,
    });
    return [ur1, ur2, ur3, ur4];
  }
  getBillUrl(id: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET + `/invoices/${id}`,
      Key: 'invoice',
      Expires: 60 * 60 * 12,
    });
  }
}
