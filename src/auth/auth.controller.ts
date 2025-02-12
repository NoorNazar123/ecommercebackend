import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from "../user/dto/create-user-dto"
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuardTsGuard } from './guards/google-auth.guard.ts/google-auth.guard.ts.guard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("signup")
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  loginUser(@Request() req) {
    // return req.user; // Authenticated user is attached to req.user
    return this.authService.login(req.user.id, req.user.username)

  }

  @UseGuards(JwtAuthGuard)
  @Get("protected")
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
  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req) {
    console.log("Received Refresh Token:", req.body.refresh); // Debugging Log
    return this.authService.refreshToken(req.user.id, req.user.username);
  }

  @UseGuards(GoogleAuthGuardTsGuard)
  @Get("google/login")
  async googleLogin() { }

  @UseGuards(GoogleAuthGuardTsGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // console.log('Google User', req.user);
    const resopnse = await this.authService.login(
      req.user.id,
      req.user.username,
      // req.user.role,
    );
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${resopnse.id}&username=${resopnse.username}&accessToken=${resopnse.accessToken}&refreshToken=${resopnse.refreshToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() req) {
    return this.authService.signOut(req.user.id);
  }

}       