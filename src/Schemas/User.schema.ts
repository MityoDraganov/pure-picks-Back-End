// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  MarketplaceSettings,
  MarketplaceSettingsSchema,
} from './MarketplaceSettings.schema';

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

  @Prop({
    required: true,
    enum: ['Verified', 'Pending', 'Non-verified'],
    default: 'Non-verified',
  })
  VerifiedStatus: string;

  @Prop({
    type: MarketplaceSettingsSchema,
    required: function () {
      return this.type === "farmer" ? true : false;
    },
  })
  marketplaceSettings: MarketplaceSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
  },
});
