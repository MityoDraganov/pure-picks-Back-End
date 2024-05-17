import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderDto } from 'src/Dtos/Order.dto';
import { Order } from 'src/Schemas/Order.schema';
import { UserDocument } from 'src/Schemas/User.schema';
import { ProductService } from '../products/products.service';
import { DeliveriesService } from '../deliveries/deliveries.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly ordersModel: Model<Order>,
    @Inject(ProductService)
    private readonly productService: ProductService,
    @Inject(DeliveriesService)
    private readonly deliveriesService: DeliveriesService,
  ) {}

  async create(buyer: UserDocument, orderDto: OrderDto) {
    let total = 0;

    for (const item of orderDto.orderedItems) {
      const productDB = await this.productService.findById(item.product._id);
      total += productDB.price * item.quantity;
    }
    const order = await this.ordersModel.create({
      buyer,
      totalCp: total,
      ...orderDto,
    });

    buyer.orders.push(order._id);
    await buyer.save();

    await this.deliveriesService.assignDelivererToOrder(order);

    return order;
  }

  //exported actions

  async getForBuyer(userId: string) {
    return await this.ordersModel.find({ buyer: userId });
  }

  async getUnassignedOrders() {
    return await this.ordersModel.find({ deliverer: null });
  }

  async assignDeliverer(delivererId: string, orderId: Types.ObjectId) {
    await this.ordersModel.findByIdAndUpdate(orderId, {
      deliverer: delivererId,
    });
  }

  async unassignDeliverer(orderId: Types.ObjectId) {
    await this.ordersModel.findByIdAndUpdate(orderId, { deliverer: null });
  }
}
