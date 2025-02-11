import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { HashModule } from 'src/common/hash/hash.module'; // 👈 Import HashModule
import { LocalStrategy } from './strategie/local.strategies';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategie/jwt.strategy';

@Module({
  imports: [
    HashModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ], // 👈 Add HashModule to imports
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaDbService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule { }
