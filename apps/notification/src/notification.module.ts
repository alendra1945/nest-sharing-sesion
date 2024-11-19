import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/shared/config/app';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),
    MailerModule.forRoot({
      transport: {
        auth: {
          user: process.env.EMAIL_SENDER_USER,
          pass: process.env.EMAIL_SENDER_PASS,
        },
        host: process.env.EMAIL_HOST,
      },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
