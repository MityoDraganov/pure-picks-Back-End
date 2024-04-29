import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ProductDto } from 'src/Dtos/product.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productDto: ProductDto) {
    return this.productService.create(productDto);
  }

  @Patch(':productId')
  async edit(
    @Body() productDto: ProductDto,
    @Param('productId') productId: string,
  ) {
    return this.productService.edit(productDto, productId);
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    return this.productService.delete(productId);
  }
}
