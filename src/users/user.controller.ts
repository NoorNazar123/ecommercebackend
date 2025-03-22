import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/create-user-dto';
import { RequestWithUser } from 'src/auth/type/request-with-user';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('profile')
  updateProfile(@Req() req: RequestWithUser, @Body() data: UpdateProfileDto) {
    const userId = req.user.id;
    return this.userService.updateProfile(userId, data);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
