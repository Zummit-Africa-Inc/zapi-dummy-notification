import { Body, Controller, Get } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get()
  async confirmEmail(@Body('token') token: string) {
    const email = await this.emailConfirmationService.decodeEmailToken(token);
    return email;
  }
}
