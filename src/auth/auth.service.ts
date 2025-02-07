import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) { }

    async registerUser(createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        // Check if the user already exists
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('User already exists!');
        }

        // Create and return the new user
        return await this.usersService.create(createUserDto);
    }
}
