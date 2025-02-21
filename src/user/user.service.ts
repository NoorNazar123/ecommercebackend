import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { HashService } from 'src/common/hash/hash.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  updatedUser(
    id: number,
    arg1: { resetPasswordToken: string; resetPasswordExpires: Date }
  ) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private readonly prisma: PrismaDbService,
    private readonly hashService: HashService
  ) {}

  async create(createUserDto: CreateUserDto, verificationToken?: string) {
    const { password, ...user } = createUserDto;
    // console.log(createUserDto.username);
    const hashedPassword = await this.hashService.hashPassword(
      createUserDto.password
    );

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user,
        verificationToken,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email, // Fixed issue: email is now passed correctly
      },
    });
  }

  async findOne(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId, // Fixed issue: email is now passed correctly
      },
    });
  }
  // hashedRefreshToken
  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null
  ) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRefreshToken,
      },
    });
  }

  async findByVerificationToken(token: string) {
    return this.prisma.user.findUnique({
      where: { verificationToken: token },
    });
  }

  async update(userId: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async findUserByResetToken(resetToken: string) {
    // Retrieve all users with a non-null resetPasswordToken
    const users = await this.prisma.user.findMany({
      where: {
        resetPasswordToken: { not: null }, // Find users with a reset token
      },
    });

    // Iterate through users and verify the token
    for (const user of users) {
      // Skip if resetPasswordToken is null
      if (!user.resetPasswordToken) continue;

      // Verify the plain token against the stored hashed token
      const isValid = await this.hashService.verifyPassword(
        user.resetPasswordToken, // Now TypeScript knows this is a string
        resetToken // Plain token from the URL
      );

      // If the token is valid, return the user
      if (isValid) {
        return user;
      }
    }

    // If no user is found with a matching token, return null
    return null;
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
