import * as dotenv from 'dotenv';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from "./middlewears/Auth.middlewear";
import { AuthModule } from './public/auth/auth.module';
import { DeliveriesModule } from './public/deliveries/deliveries.module';
import { FirebaseModule } from './firebase/firebase.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './public/order/orders.module';
import { ProductModule } from './public/products/products.module';

//middlewears


//modules









dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    AuthModule,
    ProductModule,
    OrdersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    FirebaseModule,
    DeliveriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/products', "/orders", "/auth/verification", "/deliveries");
  }
}
