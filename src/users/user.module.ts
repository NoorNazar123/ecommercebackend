import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaDbModule } from '../prisma-db/prisma-db.module'; // 👈 Import this
import { HashModule } from 'src/common/hash/hash.module';

@Module({
  imports: [PrismaDbModule, HashModule], // 👈 Add PrismaDbModule here
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
