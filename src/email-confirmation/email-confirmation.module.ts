import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailConfirmationController } from './email-confirmation.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({})],
  providers: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
