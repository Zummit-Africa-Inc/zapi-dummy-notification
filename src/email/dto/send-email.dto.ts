import { IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  text: string;

}
