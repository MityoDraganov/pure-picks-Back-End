import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Product } from 'src/Schemas/Product.schema';

import { ProductDto } from 'src/Dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(productData: ProductDto) {
    try {
      const product = await this.productModel.create(productData);
      return product
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(productData: ProductDto, productId: string) {
    try {
      const product = await this.productModel.findByIdAndUpdate(productId, productData);
      return product
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(productId: string) {
    try {
      const product = await this.productModel.findByIdAndDelete(productId);
      return product
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
