import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { VerifyEmail } from './verify.interface';
import { JwtService } from '@nestjs/jwt';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
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

  //send verification link to user
  sendVerificationLink(email: string) {
    const payload: VerifyEmail = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get('MAIL_CONFIRMATION_URL')}/${token}`;
    return this.sendMailNotification(email, 'Confirm Email!', url);
  }

  // Function that conveys mail notification to user
  async sendMailNotification(email: string, subject: string, text: string) {
    return this.sendMail({
      from: 'Zummit Dummy App <ZummitDummy@app.org>',
      to: email,
      subject,
      text,
    });
  }

  //Mail transporter
  sendMail(option: Mail.options) {
    return this.nodeMailerTransport.sendMail(option);
  }
}
