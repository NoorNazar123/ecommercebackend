import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductExtrasService {
  constructor(private readonly prisma: PrismaDbService) {}

  // 🔹 Create Variant
  async createVariant(createVariantDto: CreateVariantDto) {
    return this.prisma.productVariant.create({
      data: createVariantDto,
    });
  }

  // 🔹 Get Variants for a Product
  async findVariants(productId: number) {
    return this.prisma.productVariant.findMany({
      where: { productId },
    });
  }

  // 🔹 Update Variant
  async updateVariant(id: number, updateVariantDto: UpdateVariantDto) {
    return this.prisma.productVariant.update({
      where: { id },
      data: updateVariantDto,
    });
  }

  // 🔹 Delete Variant
  async removeVariant(id: number) {
    return this.prisma.productVariant.delete({
      where: { id },
    });
  }

  // 🔹 Create Discount
  async createDiscount(createDiscountDto: CreateDiscountDto) {
    return this.prisma.productDiscount.create({
      data: createDiscountDto,
    });
  }

  // 🔹 Get Discounts for a Product
  async findDiscounts(productId: number) {
    return this.prisma.productDiscount.findMany({
      where: { productId },
    });
  }

  // 🔹 Update Discount
  async updateDiscount(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.prisma.productDiscount.update({
      where: { id },
      data: updateDiscountDto,
    });
  }

  // 🔹 Delete Discount
  async removeDiscount(id: number) {
    return this.prisma.productDiscount.delete({
      where: { id },
    });
  }
}
