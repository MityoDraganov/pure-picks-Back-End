// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  products: mongoose.Types.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    default: [],
  })
  orders: mongoose.Types.ObjectId[];

  @Prop({ default: 'buyer', enum: ['buyer', 'farmer', 'deliverer', 'admin'] })
  type: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
  },
});
