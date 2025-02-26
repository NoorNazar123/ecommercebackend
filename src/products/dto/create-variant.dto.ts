import { IsInt, IsNumber, IsString, Min, IsPositive } from 'class-validator';

export class CreateVariantDto {
  @IsInt()
  productId: number;

  @IsString()
  name: string; // Example: "Red, Medium"

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsString()
  sku: string;
}
