import { Order, OrderSchema } from 'src/Schemas/Order.schema';

import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductModule } from '../products/products.module';

@Module({
  controllers: [OrderController],
  providers: [OrdersService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
