import { IsInt, IsPositive, IsArray, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  productIds: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  quantities: number[];

  @IsOptional() // Mark addressId as optional
  @IsInt()
  @IsPositive()
  addressId?: number; // Optional addressId for order creation
}
