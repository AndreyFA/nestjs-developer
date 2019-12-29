import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async get(): Promise<Product[]> {
    try {
      const res = await this.productService.get();
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async post(@Body() model: Product): Promise<void> {
    try {
      const res = await this.productService.post(model);
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async put(@Param('id') id: number, @Body() model: Product): Promise<void> {
    try {
      const res = await this.productService.put(id, model);
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const res = await this.productService.delete(id);
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
