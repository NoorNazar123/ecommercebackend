


import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './type/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';





@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>

    ) { }
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

    async login(userId: number, username?: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId); // Extract from object

        return {
            id: userId,
            username: username,
            accessToken,
            refreshToken,
        };
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])
        return {
            accessToken,
            refreshToken,
        }
    }

    async validationJwtUser(userId: number) {
        const user = await this.usersService.findOne(userId);
        if (!user) throw new UnauthorizedException("user not found!");
        const currentUser = { id: user.id };

        return currentUser
    }

    async validateRefreshToken(userId: number) {
        const user = await this.usersService.findOne(userId);
        if (!user) throw new UnauthorizedException("user not found!");
        const currentUser = { id: user.id };

        return currentUser
    }

    async refreshToken(userId: number, username: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId); // Extract from object

        return {
            id: userId,
            username: username,
            accessToken,
            refreshToken,
        };
    }

}


