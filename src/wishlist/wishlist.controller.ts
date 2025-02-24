// src/wishlist/wishlist.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  getWishlist(@GetUser() user: User) {
    return this.wishlistService.getWishlist(user.id);
  }

  @Post()
  addToWishlist(@GetUser() user: User, @Body() dto: CreateWishlistDto) {
    return this.wishlistService.addToWishlist(user.id, dto);
  }

  @Delete(':itemId')
  removeWishlistItem(@GetUser() user: User, @Param('itemId') itemId: string) {
    return this.wishlistService.removeWishlistItem(user.id, parseInt(itemId));
  }
}

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { WishlistService } from './wishlist.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';

// @Controller('wishlist')
// export class WishlistController {
//   constructor(private readonly wishlistService: WishlistService) {}

//   @Post()
//   create(@Body() createWishlistDto: CreateWishlistDto) {
//     return this.wishlistService.create(createWishlistDto);
//   }

//   @Get()
//   findAll() {
//     return this.wishlistService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.wishlistService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
//     return this.wishlistService.update(+id, updateWishlistDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.wishlistService.remove(+id);
//   }
// }
