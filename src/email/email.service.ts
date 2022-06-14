import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    this.nodeMailerTransport = createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      auth: {
        user: this.configService.get('MAIL_USERNAME'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  sendMail(option: Mail.options) {
    return this.nodeMailerTransport.sendMail(option);
  }
}
