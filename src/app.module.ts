import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    EmailConfirmationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
