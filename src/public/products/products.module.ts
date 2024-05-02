import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/Schemas/Product.schema';
import { AuthModule } from '../auth/auth.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    FirebaseModule
  ],
})
export class ProductModule {}
