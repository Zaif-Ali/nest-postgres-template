import { IsEmail, IsString } from 'class-validator';

export class getUserByEmailDto {
  @IsString()
  @IsEmail()
  email: string;
}
