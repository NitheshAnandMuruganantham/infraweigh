import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BillService } from './bill.service';
import * as path from 'path';
import { CreateBillDto } from './bill.dto';
import { GetCurrentUserHasuraClaims } from 'src/common/decorators/get-hasura-claims.decorator';
import { HttpsHasuraIoJwtClaims } from 'src/auth/types';
import { Public } from 'src/common/decorators';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

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
  getBill(@Param() params: any) {
    if (!params?.id) {
      throw new BadGatewayException();
    }
    return this.billService.getBill(params.id);
  }
}
