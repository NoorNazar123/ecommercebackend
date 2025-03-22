// src/cart/dto/add-to-cart.dto.ts
import { IsInt, IsPositive } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

// src/cart/dto/update-cart-item.dto.ts
export class UpdateCartItemDto {
  @IsInt()
  @IsPositive()
  quantity: number;
}
