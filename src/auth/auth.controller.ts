import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from "../user/dto/create-user-dto"
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

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


  // @UseGuards(JwtAuthGuard)
  // @Get("protected")
  // getAll(@Request() req) {
  //   return {
  //     message: `Now you take peotected api this is user id: ${req.user.id}`,
  //   }
  // }

}       