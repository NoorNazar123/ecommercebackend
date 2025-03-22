import {
  IsInt,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { DiscountType } from '@prisma/client';

export class CreateDiscountDto {
  @IsInt()
  productId: number;

  @IsEnum(DiscountType)
  discountType: DiscountType; // "PERCENTAGE" | "FIXED"

  @IsNumber()
  value: number; // Discount amount (10% or $10)

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
