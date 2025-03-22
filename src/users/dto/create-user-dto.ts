import { IsBoolean, isBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
}
