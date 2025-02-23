import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number; // ✅ Use IsDecimal for Decimal values in Prisma

  @IsInt()
  stock: number;

  @IsString()
  sku: string;

  @IsArray()
  @IsString({ each: true }) // Ensures every item in the array is a string
  images: string[];

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
