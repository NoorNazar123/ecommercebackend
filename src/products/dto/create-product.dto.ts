import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsIn,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDecimal()
  price: number;

  @IsInt()
  stock: number;

  @IsString()
  sku: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsString()
  @IsIn(['male', 'female', 'unisex'])
  gender: 'male' | 'female' | 'unisex';
}
