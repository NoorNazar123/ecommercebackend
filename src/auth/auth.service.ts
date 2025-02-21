import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService, // Inject MailService
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists!');
    }

    const verificationToken = uuidv4(); // Use UUID for consistency

    // Create and return the new user
    const newUser = await this.usersService.create(
      createUserDto,
      verificationToken
    );

    // Generate a verification token
    // const verificationToken = Math.random().toString(36).substring(2, 15);

    // Send verification email
    await this.mailService.sendVerificationEmail(email, verificationToken);

    return newUser;
  }

  async verifyEmail(token: string) {
    console.log('Received token:', token);

    // Find the user by the verification token
    const user = await this.usersService.findByVerificationToken(token);
    if (!user) {
      console.error('User not found for token:', token);
      throw new NotFoundException('Invalid or expired verification token.');
    }

    // Mark the user as verified and clear the verification token
    const updatedUser = await this.usersService.update(user.id, {
      isVerified: true,
      verificationToken: null,
    });

    console.log('Updated user: ', updatedUser);

    return { message: 'Email verified successfully!' };
  }

  async validateUserLocal(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user?.isVerified) {
      throw new UnauthorizedException(
        'please register or verify your account!'
      );
    }

    if (!email) {
      throw new UnauthorizedException(
        'Email not found Please register your account!'
      );
    }

    if (!user)
      throw new UnauthorizedException(
        'User not found. Please register your account!'
      );

    const isPasswordMatched = await verify(user.password, password); // Ensure `await` is used
    if (!isPasswordMatched)
      throw new UnauthorizedException('Wrong password! Please try again.');

    return { id: user.id, username: user.username, role: user.role }; // Return user if authentication is successful
  }

  async login(userId: number, username?: string, role?: Role) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    // Hash and store the refresh token in the database
    const hashedRefreshToken =
      await this.hashService.hashPassword(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken
    );

    return {
      id: userId,
      username: username,
      role,
      accessToken,
      refreshToken,
    };
  }

  async requestedPasswordReset(email: string) {
    console.log('reset email received:', email);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found! Please register.');
    }

    // Generate a random reset token
    const resetToken = uuidv4();

    // Hash the token before storing it
    const hashedResetToken = await this.hashService.hashPassword(resetToken);

    // Store the **hashed** token in DB
    await this.usersService.update(user.id, {
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
    });

    // Send the **plain token** (not hashed) in the email
    await this.mailService.sendPasswordResetEmail(email, resetToken);

    return { message: 'Password reset link sent. Please check your email.' };
  }

  async resetPassword(token: string, newPassword: string) {
    // ✅ Find user (DO NOT hash token before searching)
    console.log('12sk', token, newPassword);
    const user = await this.usersService.findUserByResetToken(token);

    if (!user || !user.resetPasswordToken) {
      throw new UnauthorizedException('Invalid or expired reset token.');
    }

    // ✅ Verify the plain token against the stored hashed token
    const isValid = await this.hashService.verifyPassword(
      user.resetPasswordToken,
      token
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid reset token.');
    }

    // ✅ Check if resetPasswordExpires is not null and has not expired
    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new UnauthorizedException('Reset token has expired.');
    }

    // ✅ Hash new password before saving
    const hashedPassword = await this.hashService.hashPassword(newPassword);

    // ✅ Update user password and clear reset token fields
    await this.usersService.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return { message: 'Password reset successful. Please log in.' };
  }

  //   async resetPassword(token: string, newPassword: string) {
  //     const hashedResetToken = this.hashService.hashPassword(token);

  //     const user = await this.usersService.findUserByResetToken(hashedToken);

  //     if (!user || user.resetPasswordExpires < new Date()) {
  //       throw new UnauthorizedException('Invalid or expired reset token.');
  //     }

  //     // Hash new password before saving
  //     const hashedPassword = await bcrypt.hash(newPassword, 10);

  //     // Update user password and remove reset token
  //     await this.usersService.update(user.id, {
  //       password: hashedPassword,
  //       resetPasswordToken: null,
  //       resetPasswordExpires: null,
  //     });

  //     return { message: 'Password reset successful. Please log in.' };
  //   }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validationJwtUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('user not found!');
    const currentUser = { id: user.id, role: user.role };

    return currentUser;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    const refreshTokenMatched = user.hashedRefreshToken
      ? await this.hashService.verifyPassword(
          user.hashedRefreshToken,
          refreshToken
        )
      : false;

    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token');

    return { id: user.id };
  }

  async refreshToken(userId: number, username: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId); // Extract from object
    // now it for refresh token
    const hashedRefreshToken =
      await this.hashService.hashPassword(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken
    );

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
