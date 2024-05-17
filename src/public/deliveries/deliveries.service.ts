import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/User.schema';

import { OrdersService } from '../order/orders.service';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(OrdersService)
    private readonly ordersService: OrdersService,
  ) {}

  //Receiver

  //Deliverer
  async makeAvaliable(user: UserDocument) {
    user.avaliableForDelivery = true;
    await user.save();
    return user;
  }

  async makeUnAvaliable(user: UserDocument) {
    user.avaliableForDelivery = false;
    await user.save();
    return user;
  }

  async assignDelivererToOrder(user: UserDocument) {
    const avaliableOrders = await this.ordersService.getUnassignedOrders();
    const chosenOrder = avaliableOrders[0];

    await this.ordersService.assignDeliverer(user._id, chosenOrder._id);
    user.assignedDeliveries.push(chosenOrder._id);
    await user.save();

    return await user.populate('assignedDeliveries');
  }

  async unassignDelivererFromOrder(
    user: UserDocument,
    orderId: Types.ObjectId,
  ) {
    await this.ordersService.unassignDeliverer(orderId);

    const updatedOrders = user.assignedDeliveries.filter(
      (x) => x._id !== orderId,
    );
    user.assignedDeliveries = updatedOrders;
    await user.save();

    return await user.populate('assignedDeliveries');
  }
}
