import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
  @IsNotEmpty()
  @IsString()
  verifyCode: string;
}
