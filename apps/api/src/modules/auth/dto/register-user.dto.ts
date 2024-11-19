import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}
