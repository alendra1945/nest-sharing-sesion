import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@app/shared/config/type';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NOTIFICATION_QUEUE } from '@app/shared/constant/rabbit-queue';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const configService = app.get(ConfigService<AppConfig, true>);

  const host = configService.get('rabbitmq.host', { infer: true });
  const port = configService.get('rabbitmq.port', { infer: true });
  const username = configService.get('rabbitmq.username', { infer: true });
  const password = configService.get('rabbitmq.password', { infer: true });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${username}:${password}@${host}:${port}`],
      queue: NOTIFICATION_QUEUE,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
}
bootstrap();
