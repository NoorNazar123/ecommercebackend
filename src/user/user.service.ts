import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { HashService } from 'src/common/hash/hash.service';




@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaDbService,
    private readonly hashService: HashService
  ) { }



  async create(createUserDto: CreateUserDto) {

    const { password, ...user } = createUserDto;

    const hashedPassword = await this.hashService.hashPassword(createUserDto.password);

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user
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
