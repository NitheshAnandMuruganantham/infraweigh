import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BillService } from './bill.service';
import * as path from 'path';
import { CreateBillDto } from './bill.dto';
import { GetCurrentUserHasuraClaims } from 'src/common/decorators/get-hasura-claims.decorator';
import { HttpsHasuraIoJwtClaims } from 'src/auth/types';
import { Public } from 'src/common/decorators';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { join } from 'path';
import { Response } from 'express';
import * as pdf from 'html-pdf';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  truncateString(str: string, num: number) {
    if (typeof str === 'string') {
      if (str.length > num) {
        return str.slice(0, num) + '...';
      } else {
        return str;
      }
    } else {
      return '';
    }
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 4, {
      fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg') {
          req.fileValidationError = 'Invalid file type';
          return callback(new Error('Invalid file type'), false);
        }
        return callback(null, true);
      },
    }),
  )
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateBillDto,
    @GetCurrentUserHasuraClaims() claims: HttpsHasuraIoJwtClaims,
  ) {
    if (claims['x-hasura-default-role'] !== 'terminal') {
      throw new UnauthorizedException();
    } else return this.billService.create(claims, body, files);
  }

  @Public()
  @Get('/:id')
  getBillData(@Param() params: any) {
    if (!params?.id) {
      throw new BadGatewayException();
    }
    return this.billService.getBill(params.id);
  }

  @Public()
  @Get('/slip/:id')
  async getBill(
    @Param() params: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!params?.id) {
      throw new BadGatewayException();
    } else {
      const url = this.billService.getBillUrl(params?.id);
      res.redirect(url);
    }
  }
}
