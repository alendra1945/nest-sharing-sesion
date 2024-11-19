import { Injectable } from '@nestjs/common';
import { Environment, FileSystemLoader } from 'nunjucks';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  envTemplate: Environment;
  templates = path.join('./templates');
  constructor(
    private readonly mailService: MailerService,
    private readonly config: ConfigService,
  ) {
    this.envTemplate = new Environment(new FileSystemLoader(this.templates), {
      autoescape: true,
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
  async sendEmailVerify(user: Record<string, string>) {
    const emailVerifyContent =
      this.envTemplate.getTemplate('email_verify.html');
    const renderEmailVerifyContent = emailVerifyContent.render(user);
    this.mailService.sendMail({
      from: `"My Service" <${this.config.get('smtp.sender')}>`,
      to: user.email,
      subject: 'Verify Your Email',
      html: renderEmailVerifyContent,
    });
  }
}
