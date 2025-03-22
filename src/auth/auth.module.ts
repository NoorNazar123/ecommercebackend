import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/user.service';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { HashModule } from 'src/common/hash/hash.module'; // 👈 Import HashModule
import { LocalStrategy } from './strategie/local.strategies';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategie/jwt.strategy';
import refreshConfig from './config/refresh.config';
import { RereshStrategy } from './strategie/refresh.token.strategy';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import googleOauthConfig from './config/google.oauth.config';
import { GoogleStrategy } from './strategie/google.strategy';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { MailModule } from 'src/mailers/mail.module';
import { CloudinaryConfig } from './config/cloudinary.config';
import { cloudinaryStorage } from './config/cloudinary.storage';

@Module({
  imports: [
    HashModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig), // 👈 Separate calls we can only one value init
    ConfigModule.forFeature(refreshConfig), // 👈 Separate calls
    ConfigModule.forFeature(googleOauthConfig),
    MailModule,
  ], // 👈 Add HashModule to imports
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaDbService,
    LocalStrategy,
    JwtStrategy,
    RereshStrategy,
    RefreshAuthGuard,
    GoogleStrategy,
    CloudinaryConfig,
    // {
    //   provide: " APP_GUARD", //it enble all api attached gurd of auth controller like this  @UseGuards(JwtAuthGuard)
    //   useClass: JwtAuthGuard,
    // },
    // {
    // provide: " APP_GUARD", //if we use global
    // },
  ],
  exports: [RefreshAuthGuard],
})
export class AuthModule {}
