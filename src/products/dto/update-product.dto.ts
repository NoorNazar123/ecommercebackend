import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  stock?: number;

  @IsOptional()
  sku?: string;

  @IsOptional()
  images?: string[];

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  isActive?: boolean;
}
