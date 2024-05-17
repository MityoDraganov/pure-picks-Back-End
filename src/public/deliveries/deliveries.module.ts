import { User, UserSchema } from 'src/Schemas/User.schema';

import { AuthModule } from '../auth/auth.module';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from '../order/orders.module';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    OrdersModule,
    AuthModule
  ]
})
export class DeliveriesModule {}
