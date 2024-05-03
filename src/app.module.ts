import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from "./middlewears/Auth.middlewear";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './public/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './public/products/products.module';

import * as dotenv from 'dotenv';
dotenv.config();

import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    AuthModule,
    ProductModule,
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
    consumer.apply(AuthMiddleware).forRoutes('/products');
  }
}
