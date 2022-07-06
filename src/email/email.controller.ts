import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/send-mail')
  async sendEmailConfirmation(@Body() emailDto: SendEmailDto) {
    return await this.emailService.sendMailNotification(emailDto);
  }
}
