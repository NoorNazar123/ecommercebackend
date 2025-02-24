// src/orders/dto/create-order.dto.ts
import { IsInt, IsPositive, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  productIds: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  quantities: number[];
}
