import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MarketplaceSettings,
  MarketplaceSettingsSchema,
} from 'src/Schemas/MarketplaceSettings.schema';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [MarketplaceService],
  imports: [
    MongooseModule.forFeature([
      { name: MarketplaceSettings.name, schema: MarketplaceSettingsSchema },
    ]),
    FirebaseModule
  ],
  exports: [MarketplaceService]
})
export class MarketplaceModule {}
