import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderItemService } from '../services/order-item.service';
import { ProductService } from '../services/product.service';
import { OrderItem } from '../entities/order-item.entity';

@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService,
  ) {}

  @Get(':order')
  async get(@Param('order') order: string) {
    try {
      const res = await this.orderService.getByNumber(order);
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':customer')
  async getByCustomer(@Param('customer') customer: string) {
    try {
      const res = await this.orderService.getByCustomer(customer);
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async post(@Body() model: OrderItem) {
    try {
      const res = await this.orderItemService.post(model);
      return res;
    } catch (error) {
      throw new HttpException({}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
