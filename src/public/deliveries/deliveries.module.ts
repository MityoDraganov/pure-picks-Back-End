import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from 'src/Schemas/User.schema';

import { AuthModule } from '../auth/auth.module';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from '../order/orders.module';
import { PusherLibModule } from '../pusher/pusher.module';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    PusherLibModule,
    forwardRef(() => OrdersModule)
  ],
  exports: [DeliveriesService]
})
export class DeliveriesModule {}
