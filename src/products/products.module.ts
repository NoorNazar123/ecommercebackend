// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'src/auth/config/cloudinary.storage';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  imports: [
    PrismaDbModule,
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaDbService],
})
export class ProductsModule {}
