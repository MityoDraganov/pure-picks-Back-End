import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as dotenv from 'dotenv';
dotenv.config();

//middlewears
import { AuthMiddleware } from "./middlewears/Auth.middlewear";

//modules
import { AuthModule } from './public/auth/auth.module';
import { ProductModule } from './public/products/products.module';
import { OrdersModule } from './public/order/orders.module';

import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from './firebase/firebase.module';
import { JwtModule } from '@nestjs/jwt';


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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/products', "/orders");
  }
}
