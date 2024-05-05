import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Product } from 'src/Schemas/Product.schema';

import { ProductDto } from 'src/Dtos/product.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserDocument } from 'src/Schemas/User.schema';

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

  async create(productData: ProductDto, user: UserDocument, content: File) {
    try {
      if (user.type !== 'farmer') {
        throw new HttpException(
          'Only farmers are allowed to create products',
          HttpStatus.FORBIDDEN,
        );
      }
      if (!content) {
        throw new HttpException('File required!', 404);
      }
      const contentUrl = await this.firebaseService.uploadFile(content);
      const product = await this.productModel.create({
        ...productData,
        seller: user,
        contentUrls: [contentUrl],
      });
      user.products.push(product._id);
      await user.save();
      return product;
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async edit(
    productData: Partial<ProductDto>,
    user: UserDocument,
    productId: string,
  ) {
    try {
      const product = await this.productModel.findById(productId);

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      console.log(product);

      if (product.seller.toString() !== user._id.toString()) {
        throw new HttpException(
          'You are not authorized to edit this product',
          HttpStatus.FORBIDDEN,
        );
      }

      // Update only the fields that are present in productData
      for (const key in productData) {
        if (Object.prototype.hasOwnProperty.call(productData, key)) {
          product[key] = productData[key];
        }
      }

      console.log(product);

      await product.save(); // Save the updated document
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(user: UserDocument, productId: string) {
    try {
      const product = await this.productModel.findById(productId);

      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      if (product.seller.toString() !== user._id.toString()) {
        throw new HttpException(
          'You are not authorized to delete this product',
          HttpStatus.FORBIDDEN,
        );
      }

      await product.deleteOne();
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(productId: string) {
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new HttpException('Product not found!', 404);
    }

    return product;
  }
}
