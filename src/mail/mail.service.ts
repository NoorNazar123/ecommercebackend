import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: this.configService.get<string>('EMAIL_SERVICE'), // 'gmail'
            auth: {
                user: this.configService.get<string>('EMAIL_USER'), // Your Gmail address
                pass: this.configService.get<string>('EMAIL_PASSWORD'), // Your App Password
            },
        });
    }

    async sendVerificationEmail(to: string, token: string) {
        const verificationLink = `${this.configService.get<string>('APP_URL')}/verify?token=${token}`;

        const mailOptions = {
            from: `"No Reply" <${this.configService.get<string>('EMAIL_USER')}>`,
            to,
            subject: 'Verify Your Email',
            text: `Click the link to verify your email: ${verificationLink}`,
            html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>`,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}