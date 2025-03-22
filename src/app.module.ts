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
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';

import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';
import { ProductExtrasController } from './products/product-extras.controller';
import { ProductExtrasService } from './products/product-extras.service';

@Module({
  imports: [
    PrismaDbModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    WishlistModule,
    OrdersModule,

    AddressModule,

    ReviewModule,
  ],
  controllers: [AppController, ProductExtrasController],
  providers: [AppService, ProductExtrasService],
})
export class AppModule {}
