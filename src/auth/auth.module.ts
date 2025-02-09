import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { HashModule } from 'src/common/hash/hash.module'; // 👈 Import HashModule
import { LocalStrategy } from './strategie/local.strategies';

@Module({
  imports: [HashModule], // 👈 Add HashModule to imports
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaDbService, LocalStrategy],
})
export class AuthModule { }
