import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';

import { AuthModule } from '../auth/auth.module';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/Schemas/Order.schema';
import { ProductModule } from '../products/products.module';

@Module({
  controllers: [OrderController],
  providers: [OrdersService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule
  ],
})
export class OrdersModule {}
