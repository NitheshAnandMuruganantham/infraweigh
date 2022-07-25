import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class ForgotAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class PasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
