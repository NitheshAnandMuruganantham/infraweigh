import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateIssueWebhookDto {
  @IsUUID()
  id: string;

  @IsUUID()
  user_id: string;

  @IsString()
  created_at: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  severity: string;

  @IsBoolean()
  resolved: boolean;
}
