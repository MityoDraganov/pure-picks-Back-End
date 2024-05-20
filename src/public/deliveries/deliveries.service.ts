
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/User.schema';

import { OrdersService } from '../order/orders.service';
import { PusherService } from '../pusher/pusher.service';
import { IOrder } from 'src/Interfaces/IOrder.interface';


@Injectable()
export class DeliveriesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(PusherService)
    private readonly pusherService: PusherService,
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

  async assignDelivererToOrder(order: IOrder) {
    const avaliableDeliverers = await this.userModel.find({avaliableForDelivery: true})
    const chosenDeliverer = avaliableDeliverers[0];

    chosenDeliverer.assignedDeliveries.push(order._id)
    await chosenDeliverer.save();

    console.log(chosenDeliverer);
    

    //trigger pusher
    await this.pusherService.triggerEvent(chosenDeliverer._id.toString(), "order-assigned", order)
  }

  // async unassignDelivererFromOrder(
  //   user: UserDocument,
  //   orderId: Types.ObjectId,
  // ) {
  //   await this.ordersService.unassignDeliverer(orderId);

  //   const updatedOrders = user.assignedDeliveries.filter(
  //     (x) => x._id !== orderId,
  //   );
  //   user.assignedDeliveries = updatedOrders;
  //   await user.save();

  //   //normal request (made from deliverer)

  //   return await user.populate('assignedDeliveries');
  // }
}
