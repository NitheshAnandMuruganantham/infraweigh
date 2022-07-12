import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}
  private readonly StoredApiKey: string =
    this.configService.get<string>('API_KEY');
  validateApiKey(apiKey: string) {
    return apiKey === this.StoredApiKey;
  }
}
