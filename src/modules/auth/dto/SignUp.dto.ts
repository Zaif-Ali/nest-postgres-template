import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "src/types/user.types";

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
