import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class DeliveryAddress {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

}

export const DeliveryAddressSchema = SchemaFactory.createForClass(DeliveryAddress);