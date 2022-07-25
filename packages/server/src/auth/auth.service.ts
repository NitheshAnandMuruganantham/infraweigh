import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthDto } from './auth.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'nestjs-prisma';
@Injectable()
export class AuthService {
  constructor(
    private mailer: MailerService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  private readonly StoredApiKey: string = this.config.get<string>('API_KEY');
  validateApiKey(apiKey: string) {
    return apiKey === this.StoredApiKey;
  }
  async signinLocal(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token_hash: null,
      },
    });

    return true;
  }

  async refreshTokens(
    userId: string,
    rt: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: any;
  }> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refresh_token_hash)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.refresh_token_hash, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token_hash: hash,
      },
    });
  }

  async getTokens(userId: string): Promise<{
    access_token: string;
    refresh_token: string;
    user: any;
  }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');
    const jwtPayload = {
      sub: user.id,
      email: user.email,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [user.role],
        'x-hasura-default-role': user.role,
        'x-hasura-tenent-id': user.tenent_id,
        'x-hasura-user-id': user.id,
        'x-hasura-weighbridge-id': user.weighbridge_id,
        'x-hasura-user-email': user.email,
      },
    };
    const buff = new Buffer(this.config.get<string>('AT_PRIVATE'), 'base64');

    const key = buff.toString('utf8');
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { ...jwtPayload, type: 'access_token' },
        {
          algorithm: 'RS256',
          privateKey: key,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { ...jwtPayload, type: 'refresh_token' },
        {
          secret: this.config.get<string>('RT_SECRET'),
          expiresIn: '6h',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenent_id: user.tenent_id,
        weighbridge_id: user.weighbridge_id,
        email_verified: user.email_verified,
        profile: user.profile,
      },
    };
  }

  async forgotPassToken(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');
    const jwtPayload = {
      sub: user.id,
      email: user.email,
      verified: user.email_verified,
    };
    const token = await this.jwtService.signAsync(
      {
        ...jwtPayload,
        type: 'forgot_password',
      },
      {
        secret: this.config.get<string>('FORGOT_PASSWORD_SECRET'),
        expiresIn: '2d',
      },
    );
    const hash = await argon.hash(token);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        forgot_password_token_hash: hash,
      },
    });
    await this.mailer.sendPasswordResetEmail(
      user.email,
      `${this.config.get<string>(
        'FRONTEND_URL',
      )}/reset-password?token=${token}`,
    );
    return 'ok';
  }
  async verifyForgotPassToken(token: string, password: string) {
    const tokenData = await this.jwtService.verifyAsync(token, {
      secret: this.config.get<string>('FORGOT_PASSWORD_SECRET'),
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenData.sub,
      },
    });
    if (!user.forgot_password_token_hash) {
      throw new ForbiddenException('Access Denied');
    }
    const verifyHash = await argon.verify(
      user.forgot_password_token_hash,
      token,
    );
    if (!verifyHash) throw new ForbiddenException('Access Denied');

    const verify = await this.jwtService.verifyAsync(token, {
      secret: this.config.get<string>('FORGOT_PASSWORD_SECRET'),
    });
    if (!verify) throw new ForbiddenException('Access Denied');
    const newPass = await argon.hash(password);
    await this.prisma.user.update({
      where: {
        id: verify.sub,
      },
      data: {
        password: newPass,
        refresh_token_hash: null,
        forgot_password_token_hash: null,
        email_verified: true,
      },
    });
    return 'ok';
  }
}
