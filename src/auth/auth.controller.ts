import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard.ts/google.guard';
import { response, Response } from 'express';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles/roles.guard';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  prisma: any;
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    console.log('Received token:', token);
    return this.authService.verifyEmail(token);
  }

  // @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req) {
    // return req.user; // Authenticated user is attached to req.user
    return this.authService.login(
      req.user.id,
      req.user.username,
      req.user.role
    );
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email: string) {
    console.log('email revied:123', email);

    const resetToken = await this.authService.requestedPasswordReset(email);
    return {
      message:
        'Please check your email reset Password  link has been sent to your email',
      resetToken,
    };
  }
  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string
  ) {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Password has been successfully reset!' };
  }

  @Roles('ADMIN', 'EDITOR')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard) //now we no need buz we defined in auth module global guard
  @Get('protected')
  getAll(@Request() req) {
    return {
      message: `You have accessed a protected API. This is your user ID: ${req.user.id}`,
    };
  }
  // @UseGuards(RefreshAuthGuard)
  // @Post("refresh")
  // refreshToken(@Request() req) {
  //   return this.authService.refreshToken(req.user.id, req.user.username)
  // }
  // @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    console.log('Received Refresh Token:', req.body.refresh); // Debugging Log
    return this.authService.refreshToken(req.user.id, req.user.username);
  }
  // @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleLogin() {}

  // @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // console.log('Google User', req.user);
    const response = await this.authService.login(
      req.user.id,
      req.user.username,
      req.user.role
    );
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${response.id}&username=${response.username}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&role=${response.role}`
    );
  }

  @UseGuards(JwtAuthGuard) //now we no need buz we defined in auth module global guard
  @Post('signout')
  signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }
}
