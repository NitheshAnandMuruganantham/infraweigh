import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards/rt-guard';
import { AuthService } from './auth.service';
import { AuthDto, ForgotAuthDto, PasswordDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto) {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) response: any,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Post('forgot')
  async forgotPassword(@Body() dto: ForgotAuthDto) {
    return this.authService.forgotPassToken(dto.email);
  }

  @Public()
  @Post('forgot/:token')
  async changePassword(@Param() parm: any, @Body() dto: PasswordDto) {
    return this.authService.verifyForgotPassToken(parm.token, dto.password);
  }
}
