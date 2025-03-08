import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@GetUser() user: User) {
    return this.cartService.getCart(user.id);
  }

  @Post()
  addToCart(@GetUser() user: User, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(user.id, dto);
  }

  @Patch(':itemId')
  updateCartItem(
    @GetUser() user: User,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto
  ) {
    return this.cartService.updateCartItem(user.id, parseInt(itemId), dto);
  }

  @Delete(':itemId')
  removeCartItem(@GetUser() user: User, @Param('itemId') itemId: string) {
    return this.cartService.removeCartItem(user.id, parseInt(itemId));
  }
}
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { AddToCartDto } from './dto/create-cart.dto';
// import { UpdateCartItemDto } from './dto/create-cart.dto';

// @Controller('cart')
// export class CartController {
//   constructor(private readonly cartService: CartService) {}

//   @Post()
//   create(@Body() createCartDto: AddToCartDto) {
//     return this.cartService.create(createCartDto);
//   }

//   @Get()
//   findAll() {
//     return this.cartService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.cartService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCartDto: UpdateCartItemDto) {
//     return this.cartService.update(+id, updateCartDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.cartService.remove(+id);
//   }
// }
