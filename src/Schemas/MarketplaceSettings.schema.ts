import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MarketplaceSettings {
  @Prop({
    type: {
      latitude: { type: Number },
      longitude: { type: Number }
    },
    required: true
  })
  sellerLocation: {
    latitude: number;
    longitude: number;
  };

  @Prop()
  documents: File[];
}

export type MarketplaceSettingsDocument = MarketplaceSettings & Document;
export const MarketplaceSettingsSchema = SchemaFactory.createForClass(MarketplaceSettings);
