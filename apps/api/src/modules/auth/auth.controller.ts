import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { VerifyUserDto } from './dto/verify-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async accountRegister(@Res() response, @Body() body: RegisterUserDto) {
    try {
      const data = await this.authService.registerUser(body);
      return response.status(HttpStatus.CREATED).json({
        message: 'Success',
        data: data,
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to create account',
        error: 'Bad Request',
      });
    }
  }
  @Post('/verify')
  async accountVerify(@Res() response, @Body() body: VerifyUserDto) {
    try {
      await this.authService.verifyUser(body.verifyCode);
      return response.status(HttpStatus.OK).json({
        message: 'Email Verified',
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to create account',
        error: 'Bad Request',
      });
    }
  }
}
