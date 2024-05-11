import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from 'src/Schemas/Location.schema';

@Module({
  providers: [LocationService],
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
  ],
  exports: [LocationService],
})
export class LocationModule {}
