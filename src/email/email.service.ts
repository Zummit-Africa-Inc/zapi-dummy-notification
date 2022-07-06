import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import * as Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    // Set the mail service provider
    this.nodeMailerTransport = createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      auth: {
        user: this.configService.get('MAIL_USERNAME'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  // Function that conveys mail notification to user
  async sendMailNotification(sendEmailDto: SendEmailDto) {
    return this.sendMail({
      from: 'Zummit Dummy App <ZummitDummy@app.org>',
      to: sendEmailDto.email,
      subject: sendEmailDto.subject,
      text: sendEmailDto.text,
    });
  }

  //Mail transporter
  sendMail(option: Mail.options) {
    return this.nodeMailerTransport.sendMail(option);
  }
}
