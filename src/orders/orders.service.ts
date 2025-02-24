// src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaDbService) {}

  async createOrder(dto: CreateOrderDto & { userId: number }) {
    const { userId, productIds, quantities } = dto;

    // Fetch products and calculate total price
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
    }

    const totalPrice = products.reduce((total, product, index) => {
      return total + product.price.mul(quantities[index]).toNumber();
    }, 0);

    // Create order
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        items: {
          create: productIds.map((productId, index) => ({
            productId,
            quantity: quantities[index],
            price: products[index].price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    return order;
  }

  async getOrderById(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
    });

    return order;
  }
  async updatePaymentStatus(id: number) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new Error('Payment has already been completed');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { paymentStatus: PaymentStatus.PAID },
    });

    return updatedOrder;
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderStatusDto } from './dto/update-order.dto';

// @Injectable()
// export class OrdersService {
//   create(createOrderDto: CreateOrderDto) {
//     return 'This action adds a new order';
//   }

//   findAll() {
//     return `This action returns all orders`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} order`;
//   }

//   update(id: number, updateOrderDto: UpdateOrderStatusDto) {
//     return `This action updates a #${id} order`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} order`;
//   }
// }
