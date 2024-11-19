import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '@app/shared/schemas/account.schema';
import { AppConfig } from '@app/shared/config/type';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NOTIFICATION_QUEUE } from '@app/shared/constant/rabbit-queue';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'NOTIFICATION_SERVICE',
      useFactory: (configService: ConfigService<AppConfig, true>) => {
        const host = configService.get('rabbitmq.host', { infer: true });
        const port = configService.get('rabbitmq.port', { infer: true });
        const username = configService.get('rabbitmq.username', {
          infer: true,
        });
        const password = configService.get('rabbitmq.password', {
          infer: true,
        });

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${username}:${password}@${host}:${port}`],
            queue: NOTIFICATION_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
