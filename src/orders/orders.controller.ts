// src/orders/orders.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@GetUser() user: User, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder({ ...dto, userId: user.id });
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrderById(parseInt(id));
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateOrderStatus(parseInt(id), dto);
  }

  @Patch(':id/payment')
  updatePaymentStatus(@Param('id') id: string) {
    return this.ordersService.updatePaymentStatus(parseInt(id));
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
// import { OrdersService } from './orders.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderStatusDto } from './dto/update-order.dto';

// @Controller('orders')
// export class OrdersController {
//   constructor(private readonly ordersService: OrdersService) {}

//   @Post()
//   create(@Body() createOrderDto: CreateOrderDto) {
//     return this.ordersService.create(createOrderDto);
//   }

//   @Get()
//   findAll() {
//     return this.ordersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.ordersService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateOrderDto: UpdateOrderStatusDto
//   ) {
//     return this.ordersService.update(+id, updateOrderDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.ordersService.remove(+id);
//   }
// }
