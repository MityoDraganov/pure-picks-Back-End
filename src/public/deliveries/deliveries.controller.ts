import {
  Controller,
  Inject,
  Get,
  Req,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { DeliveriesService } from './deliveries.service';
import { OrdersService } from '../order/orders.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly deliveriesService: DeliveriesService,
    private readonly ordersService: OrdersService,
  ) {}

  // --Receivers--

  // --Deliverers--

  @Post('deliverer/makeAvaliable')
  async makeAvaliable(@Req() req: Request) {
    const user = await this.authService.findUserById(req.userId);
    return this.deliveriesService.makeAvaliable(user);
  }

  @Post('deliverer/makeUnAvaliable')
  async makeUnAvaliable(@Req() req: Request) {
    const user = await this.authService.findUserById(req.userId);
    return this.deliveriesService.makeUnAvaliable(user);
  }

  @Post('deliverer/acceptOrder/:productId')
  async acceptOrder(@Param('productId') orderId: string, @Req() req: Request) {
    const user = await this.authService.findUserById(req.userId);
    const order = await this.ordersService.getOrderById(orderId);
    return this.deliveriesService.assignDelivererToOrder(order, user);
  }
}
