import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({})],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
