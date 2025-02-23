import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('send-verification')
    async sendVerificationEmail(@Body() body: { email: string, token: string }) {
        return this.mailService.sendVerificationEmail(body.email, body.token);
    }
}