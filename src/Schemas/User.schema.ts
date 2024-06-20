// user.schema.ts

import {
  MarketplaceSettings,
  MarketplaceSettingsSchema,
} from './MarketplaceSettings.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = Document & User;

@Schema()
export class User {
  // --ALL--
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    type: [String],
    enum: ['buyer', 'farmer', 'deliverer', 'admin'],
    default: ['buyer'],
  })
  type: string[];

  // --Seller--
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  products: mongoose.Types.ObjectId[];

  @Prop({
    required: true,
    enum: ['Verified', 'Pending', 'Non-verified'],
    default: 'Non-verified',
  })
  VerifiedStatus: string;

  @Prop({
    type: MarketplaceSettingsSchema,
    required: function () {
      return this.type === 'farmer' ? true : false;
    },
  })
  marketplaceSettings: MarketplaceSettings;

  // --Buyer--
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    default: [],
  })
  orders: mongoose.Types.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  savedProducts: mongoose.Types.ObjectId[];

  // --Deliverer--
  @Prop({
    required: function () {
      return this.type === 'deliverer' ? true : false;
    },
    default: false,
  })
  avaliableForDelivery: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    required: function () {
      return this.type === 'deliverer' ? true : false;
    },
    default: [],
  })
  assignedDeliveries: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret?.marketplaceSettings?.documents;
  },
});
