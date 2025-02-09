import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
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

    async validateUserLocal(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException("User not found. Please register!");

        const isPasswordMatched = await verify(user.password, password); // Ensure `await` is used
        if (!isPasswordMatched) throw new UnauthorizedException("Wrong password");

        return { id: user.id, username: user.username }; // Return user if authentication is successful
    }

}
