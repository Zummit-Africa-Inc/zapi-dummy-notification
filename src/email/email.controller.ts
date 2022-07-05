import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfirmEmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/confirm')
  async sendEmailConfirmation(@Body() emailDto: ConfirmEmailDto) {
    return await this.emailService.sendVerificationLink(emailDto.email);
  }
}
