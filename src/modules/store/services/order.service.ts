import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getByNumber(orderNumber: string): Promise<Order> {
    return await this.orderRepository.findOne({ orderNumber });
  }

  async getByCustomer(customer: string): Promise<Order[]> {
    return await this.orderRepository.find({ customer });
  }

  async post(order: Order): Promise<void> {
    await this.orderRepository.save(order);
  }
}
