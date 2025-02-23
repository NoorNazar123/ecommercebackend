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
    const verificationLink = `${this.configService.get<string>('APP_URL')}/auth/verify?token=${token}`;

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

  async sendPasswordResetEmail(to: string, resetToken: string) {
    const resetUrl = `${this.configService.get<string>('APP_URL')}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"No Reply" <${this.configService.get<string>('EMAIL_USER')}>`,
      to,
      subject: 'Reset Your Password',
      text: `Click the link to reset your password: ${resetUrl}`,
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
}
