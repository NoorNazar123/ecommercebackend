import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()], // Load environment variables
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService], // Export MailService for use in other modules
})
export class MailModule { }