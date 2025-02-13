import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { HashService } from 'src/common/hash/hash.service';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';




@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaDbService,
    private readonly hashService: HashService
  ) { }



  async create(createUserDto: CreateUserDto) {

    const { password, ...user } = createUserDto;

    console.log(createUserDto.username);


    const hashedPassword = await this.hashService.hashPassword(createUserDto.password);

    const verificationToken = uuidv4();

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
  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
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
