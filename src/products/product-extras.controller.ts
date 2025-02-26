import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ProductExtrasService } from './product-extras.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('products/extras')
export class ProductExtrasController {
  constructor(private readonly productExtrasService: ProductExtrasService) {}

  // 🔹 Create Product Variant
  @Post('variants')
  createVariant(@Body() createVariantDto: CreateVariantDto) {
    return this.productExtrasService.createVariant(createVariantDto);
  }

  // 🔹 Get All Variants for a Product
  @Get('variants/:productId')
  findVariants(@Param('productId') productId: number) {
    return this.productExtrasService.findVariants(+productId);
  }

  // 🔹 Update a Variant
  @Patch('variants/:id')
  updateVariant(
    @Param('id') id: number,
    @Body() updateVariantDto: UpdateVariantDto
  ) {
    return this.productExtrasService.updateVariant(+id, updateVariantDto);
  }

  // 🔹 Delete a Variant
  @Delete('variants/:id')
  removeVariant(@Param('id') id: number) {
    return this.productExtrasService.removeVariant(+id);
  }

  // 🔹 Create Product Discount
  @Post('discounts')
  createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    return this.productExtrasService.createDiscount(createDiscountDto);
  }

  // 🔹 Get Discount for a Product
  @Get('discounts/:productId')
  findDiscounts(@Param('productId') productId: number) {
    return this.productExtrasService.findDiscounts(+productId);
  }

  // 🔹 Update a Discount
  @Patch('discounts/:id')
  updateDiscount(
    @Param('id') id: number,
    @Body() updateDiscountDto: UpdateDiscountDto
  ) {
    return this.productExtrasService.updateDiscount(+id, updateDiscountDto);
  }

  // 🔹 Delete a Discount
  @Delete('discounts/:id')
  removeDiscount(@Param('id') id: number) {
    return this.productExtrasService.removeDiscount(+id);
  }
}
