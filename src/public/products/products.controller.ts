import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { ProductDto } from 'src/Dtos/product.dto';

//services
import { AuthService } from '../auth/auth.service';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async getAll(@Query('seller') seller: string) {
    if (seller) {
      return this.productService.getBySeller(seller);
    } else {
      // If 'seller' parameter is not provided, return all products
      return this.productService.getAll();
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() productDto: ProductDto,
    @Req() req: Request,
    @UploadedFiles() content: any,
  ) {    
    console.log(content);
    
    const user = await this.authService.findUserById(req.userId);
    return this.productService.create(productDto, user, content);
  }

  @Patch(':productId')
  @UseInterceptors(FilesInterceptor('files'))
  async edit(
    @Body() productDto: ProductDto,
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    
    const user = await this.authService.findUserById(req.userId);
    return this.productService.edit(productDto, user, productId);
  }

  @Delete(':productId')
  async delete(
    @Param('productId') productId: string,
    @Req() req: Request,
  ) {
    const user = await this.authService.findUserById(req.userId);
    return this.productService.delete(user, productId);
  }
}
