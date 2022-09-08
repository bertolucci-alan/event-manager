import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthenticateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
