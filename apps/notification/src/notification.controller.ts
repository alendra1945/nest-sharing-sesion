import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Channel, Message } from 'amqplib';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/hhhh')
  getAlen() {
    return {};
  }
  @MessagePattern({ cmd: 'send-email-verification' })
  async sendEmail(
    @Ctx() context: RmqContext,
    @Payload() user: { email: string },
  ) {
    const channel: Channel = context.getChannelRef();
    const message = context.getMessage() as Message;
    await this.notificationService.sendEmailVerify(user);
    try {
      channel.ack(message);
    } catch (err) {
      console.log('err', err);
    }
    return { data: 'success' };
  }
}
