import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { OrderDto } from 'src/Dtos/Order.dto';
import { Order } from 'src/Schemas/Order.schema';
import { UserDocument } from 'src/Schemas/User.schema';
import { ProductService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly ordersModel: Model<Order>,
    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  async getForBuyer(userId: string) {
    return await this.ordersModel.find({ buyer: userId });
  }

  async create(buyer: UserDocument, orderDto: OrderDto) {
    let total = 0;

    for (const item of orderDto.orderedItems) {
      const productDB = await this.productService.findById(item.product._id);
      total += productDB.price * item.quantity;
    }
    const order = await this.ordersModel.create({
      buyer,
      totalCp: total,
      ...orderDto
    });


    buyer.orders.push(order._id);
    await buyer.save();

    return order
  }
}
