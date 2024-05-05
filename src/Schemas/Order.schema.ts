import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './User.schema';
import mongoose from 'mongoose';
import { Product } from './Product.schema';

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  buyer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
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

  @Prop({ default: Date.now, required: true, type: Date })
  readonly putDate: Date;

  @Prop({required: true })
  totalCp: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
