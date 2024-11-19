import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Account } from '@app/shared/schemas/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { generateVerificationCode } from '@app/shared/utils/helper';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}
  async registerUser(body: RegisterUserDto) {
    const { password, ...newUser } = body;
    const hashPassoword = await this.getHashedPassword(password);
    const verifyCode = await generateVerificationCode();
    const createUser = new this.accountModel({
      ...newUser,
      password: hashPassoword,
      verifyCode,
    });

    const createdUser = await createUser.save();
    if (createdUser.email) {
      try {
        this.notificationService
          .send(
            {
              cmd: 'send-email-verification',
            },
            {
              email: createUser.email,
              verifyCode: btoa(`${createUser.email}:${verifyCode}`),
            },
          )
          .subscribe();
      } catch (err) {
        console.log(err);
      }
    }

    return createdUser;
  }
  async verifyUser(verifyCode: string) {
    const [email, code] = atob(verifyCode).split(':');
    const user = await this.accountModel.findOne({ email: email });
    if (user.verifyCode == code) {
      user.email_verified = true;
      user.verifyCode = '';
      user.save();
    }
  }
  async getHashedPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
}
