import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async get(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async post(product: Product): Promise<void> {
    await this.productRepository.save(product);
  }

  async put(id: number, product: Product): Promise<void> {
    await this.productRepository.update(id, product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
