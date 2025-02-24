import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaDbService) {}

  async getWishlist(userId: number) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // ✅ Ensuring product details are included
          },
        },
      },
    });

    // Instead of throwing an error, return an empty structure
    return wishlist ?? { userId, items: [] };
  }

  async addToWishlist(userId: number, dto: CreateWishlistDto) {
    // Fetch the existing wishlist
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: { items: true },
    });

    // If wishlist doesn't exist, create a new one
    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: {
          userId,
          items: { create: { productId: dto.productId } },
        },
        include: { items: true },
      });
      return wishlist;
    }

    // Check if the product is already in the wishlist
    const productExists = wishlist.items.some(
      (item) => item.productId === dto.productId
    );
    if (productExists) {
      throw new Error('Product already in wishlist');
    }

    // Add the product to wishlist
    const updatedWishlist = await this.prisma.wishlist.update({
      where: { userId },
      data: {
        items: { create: { productId: dto.productId } },
      },
      include: { items: { include: { product: true } } },
    });

    return updatedWishlist;
  }

  async removeWishlistItem(userId: number, itemId: number) {
    const item = await this.prisma.wishlistItem.findFirst({
      where: { id: itemId, wishlist: { userId } },
    });

    if (!item) {
      throw new NotFoundException('Wishlist item not found');
    }

    return this.prisma.wishlistItem.delete({
      where: { id: itemId },
    });
  }
}

// // src/wishlist/wishlist.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';

// @Injectable()
// export class WishlistService {
//   constructor(private prisma: PrismaDbService) {}

//   async getWishlist(userId: number) {
//     return this.prisma.wishlist.findUnique({
//       where: { userId },
//       include: { items: { include: { product: true } } },
//     });
//   }

//   async addToWishlist(userId: number, dto: CreateWishlistDto) {
//     const wishlist = await this.prisma.wishlist.upsert({
//       where: { userId },
//       create: { userId, items: { create: { productId: dto.productId } } },
//       update: {
//         items: {
//           create: { productId: dto.productId },
//         },
//       },
//     });
//     return wishlist;
//   }

//   async removeWishlistItem(userId: number, itemId: number) {
//     return this.prisma.wishlistItem.delete({
//       where: { id: itemId, wishlist: { userId } },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// @Injectable()
// export class WishlistService {
//   create(createWishlistDto: CreateWishlistDto) {
//     return 'This action adds a new wishlist';
//   }

//   findAll() {
//     return `This action returns all wishlist`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} wishlist`;
//   }

//   update(id: number, updateWishlistDto: UpdateWishlistDto) {
//     return `This action updates a #${id} wishlist`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} wishlist`;
//   }
// }
