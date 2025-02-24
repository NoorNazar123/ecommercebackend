import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaDbService) {}

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  async addToCart(userId: number, dto: AddToCartDto) {
    // Find the user's cart or create one if it doesn't exist
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      select: { id: true }, // Only fetch the cart ID
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Upsert the cart item (update if exists, otherwise create)
    await this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: dto.productId,
        },
      },
      create: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
      },
      update: {
        quantity: { increment: dto.quantity },
      },
    });

    return this.getCart(userId); // Return updated cart
  }

  async updateCartItem(userId: number, itemId: number, dto: UpdateCartItemDto) {
    return this.prisma.cartItem.update({
      where: { id: itemId, cart: { userId } },
      data: { quantity: dto.quantity },
    });
  }
  async removeCartItem(userId: number, itemId: number) {
    // Find the cart item first
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem) {
      throw new Error('Cart item does not exist');
    }

    if (cartItem.cart.userId !== userId) {
      throw new Error('Unauthorized: This item does not belong to the user');
    }

    // Delete the item if it belongs to the user
    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    return { message: 'Item removed successfully' };
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';

// @Injectable()
// export class CartService {
//   create(createCartDto: CreateCartDto) {
//     return 'This action adds a new cart';
//   }

//   findAll() {
//     return `This action returns all cart`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} cart`;
//   }

//   update(id: number, updateCartDto: UpdateCartDto) {
//     return `This action updates a #${id} cart`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} cart`;
//   }
// }
