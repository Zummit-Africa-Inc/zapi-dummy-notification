import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { VerifyToken } from './verify-token.interface';
import { ZuAppResponse } from '../common/helpers/response';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  sendVerificationLink(email: string) {
    const payload: VerifyToken = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const url = `${this.configService.get(
      'MAIL_CONFIRMATION_URL',
    )}?token=${token}`;
    const text = `Welcome to Zummit. To confirm your mail, please click this address here: ${url}`;

    return this.emailService.sendMail({
      from: 'Zummit Dummy App <ZummitDummy@app.org>',
      to: email,
      subject: 'Confirmation Mail',
      text,
    });
  }

  async decodeEmailToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Unauthorized', 'Email not confirmed'),
      );
    } catch (error) {
      if (error?.name === 'TokenExpiredError')
        throw new BadRequestException(
          ZuAppResponse.BadRequest(
            'Token Expired',
            'Email confirmation token expired',
            '400',
          ),
        );
      throw new BadRequestException(
        ZuAppResponse.BadRequest('Bad Token', 'Bad confirmation token', '400'),
      );
    }
  }
}