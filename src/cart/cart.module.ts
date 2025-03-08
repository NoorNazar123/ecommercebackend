// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  imports: [PrismaDbModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
