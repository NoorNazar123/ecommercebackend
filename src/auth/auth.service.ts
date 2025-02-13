
import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './type/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';
import { HashService } from 'src/common/hash/hash.service';
import { Role } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';




@Injectable()
export class AuthService {
    constructor(
        private readonly hashService: HashService,
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService, // Inject MailService
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
        const newUser = await this.usersService.create(createUserDto);

        // Generate a verification token
        const verificationToken = Math.random().toString(36).substring(2, 15);

        // Send verification email
        await this.mailService.sendVerificationEmail(email, verificationToken);

        return newUser;

    }

    async verifyEmail(token: string) {
        // Find the user by the verification token
        const user = await this.usersService.findByVerificationToken(token);
        if (!user) {
            throw new NotFoundException('Invalid or expired verification token.');
        }

        // Mark the user as verified and clear the verification token
        await this.usersService.update(user.id, {
            isVerified: true,
            verificationToken: null,
        });

        return { message: 'Email verified successfully!' };
    }

    async validateUserLocal(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException("User not found. Please register!");

        const isPasswordMatched = await verify(user.password, password); // Ensure `await` is used
        if (!isPasswordMatched) throw new UnauthorizedException("Wrong password");

        return { id: user.id, username: user.username, role: user.role }; // Return user if authentication is successful
    }


    async login(userId: number, username?: string, role?: Role) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);

        // Hash and store the refresh token in the database
        const hashedRefreshToken = await this.hashService.hashPassword(refreshToken);
        await this.usersService.updateHashedRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            username: username,
            role,
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
        const currentUser = { id: user.id, role: user.role };

        return currentUser
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.usersService.findOne(userId);
        if (!user) throw new UnauthorizedException("User not found!");

        const refreshTokenMatched = user.hashedRefreshToken
            ? await this.hashService.verifyPassword(user.hashedRefreshToken, refreshToken)
            : false;

        if (!refreshTokenMatched) throw new UnauthorizedException("Invalid refresh token");

        return { id: user.id };
    }

    async refreshToken(userId: number, username: string) {
        const { accessToken, refreshToken } = await this.generateTokens(userId); // Extract from object
        // now it for refresh token
        const hashedRefreshToken = await this.hashService.hashPassword(refreshToken);
        await this.usersService.updateHashedRefreshToken(userId, hashedRefreshToken)

        return {
            id: userId,
            username: username,
            accessToken,
            refreshToken,
        };
    }

    async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.usersService.findByEmail(googleUser.email);
        if (user) return user;
        return await this.usersService.create(googleUser);
    }

    async signOut(userId: number) {
        return await this.usersService.updateHashedRefreshToken(userId, null);
    }

}


