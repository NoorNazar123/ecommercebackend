import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Request } from 'express';
import { RequestWithUser } from 'src/auth/type/request-with-user';

@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async createAddress(
    @Req() req: RequestWithUser,
    @Body() data: CreateAddressDto
  ) {
    const userId = req.user.id;

    // Pass the userId along with the data to the service
    return this.addressService.createAddress(userId, data);
  }

  @Patch(':id')
  updateAddress(
    @Req() req: RequestWithUser,
    @Param('id') addressId: string,
    @Body() data: UpdateAddressDto
  ) {
    const userId = req.user.id;
    return this.addressService.updateAddress(+addressId, userId, data);
  }

  @Delete(':id')
  deleteAddress(@Req() req: RequestWithUser, @Param('id') addressId: string) {
    const userId = req.user.id;
    return this.addressService.deleteAddress(+addressId, userId);
  }

  @Get()
  getUserAddresses(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.addressService.getUserAddresses(userId);
  }
}

// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { AddressService } from './address.service';
// import { CreateAddressDto } from './dto/create-address.dto';
// import { UpdateAddressDto } from './dto/update-address.dto';

// @Controller('address')
// export class AddressController {
//   constructor(private readonly addressService: AddressService) {}

//   @Post()
//   create(@Body() createAddressDto: CreateAddressDto) {
//     return this.addressService.create(createAddressDto);
//   }

//   @Get()
//   findAll() {
//     return this.addressService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.addressService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
//     return this.addressService.update(+id, updateAddressDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.addressService.remove(+id);
//   }
// }
