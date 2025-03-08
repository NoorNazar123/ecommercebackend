// src/wishlist/wishlist.module.ts
import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  imports: [PrismaDbModule],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
