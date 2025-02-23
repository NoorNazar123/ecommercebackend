import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mailers/mail.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PrismaDbModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Explicitly load the .env file
    }),
    MailModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
