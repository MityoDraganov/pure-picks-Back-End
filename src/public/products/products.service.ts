import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Product } from 'src/Schemas/Product.schema';

import { ProductDto } from 'src/Dtos/product.dto';
import { IUser } from 'src/Interfaces/User.interface';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getAll() {
    try {
      const products = await this.productModel
        .find()
        .populate('seller')
        .select('-password');
      return products;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getBySeller(sellerId: string) {
    try {
      const products = await this.productModel
        .find({ seller: sellerId })
        .populate('seller')
        .select('-password');
      return products;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(productData: ProductDto, user: IUser, content: File) {
    try {
      if (!content) {
        throw new HttpException('File required!', 404);
      }
      const contentUrl = await this.firebaseService.uploadFile(content);
      const product = await this.productModel.create({
        ...productData,
        seller: user,
        contentUrls: [contentUrl],
      });
      return product;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(productData: ProductDto, productId: string) {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        productId,
        productData,
      );
      return product;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(productId: string) {
    try {
      const product = await this.productModel.findByIdAndDelete(productId);
      return product;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
