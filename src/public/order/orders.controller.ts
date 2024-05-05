import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { OrderDto } from 'src/Dtos/Order.dto';
import { OrdersService } from './orders.service';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly ordersService: OrdersService,
  ) {}
  @Get()
  async get(@Req() req: Request) {
    await this.authService.findUserById(req.userId)
    return this.ordersService.getForBuyer(req.userId)
  }

  @Post()
  async create(@Body() orderDto: OrderDto, @Req() req: Request) {
    const buyer = await this.authService.findUserById(req.userId);
    return this.ordersService.create(buyer, orderDto);
  }
}
