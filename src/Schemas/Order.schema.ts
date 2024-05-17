import { DeliveryAddress, DeliveryAddressSchema } from './DeliveryAddress.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Product } from './Product.schema';
import { User } from './User.schema';
import mongoose from 'mongoose';

//schemas




@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  buyer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null})
  deliverer: User;

  @Prop({
    required: true,
    enum: ['delivered', 'put', "accepted", 'cancelled'],
    default: "put"
  })
  status: string;

  @Prop({required: true})
  orderedItems: [{
    product: Product,
    quantity: number
  }]

  @Prop({ type: DeliveryAddressSchema, required: true })
  deliveryAddress: DeliveryAddress;

  @Prop()
  deliveryNote: string;

  @Prop({ default: Date.now, required: true, type: Date })
  readonly putDate: Date;

  @Prop({required: true })
  totalCp: number;
}
export type OrderDocument = Document & Order;
export const OrderSchema = SchemaFactory.createForClass(Order);
