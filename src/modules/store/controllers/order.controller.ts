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
import { ResultDto } from '../dtos/result.dto';
import { OrderItemDto } from '../dtos/order-item.dto';
import { Order } from '../entities/order.entity';

@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService,
  ) {}

  @Get(':order')
  async get(@Param('order') order: string): Promise<ResultDto> {
    try {
      const res = await this.orderService.getByNumber(order);
      return new ResultDto('', true, res, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(null, false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':customer')
  async getByCustomer(@Param('customer') customer: string): Promise<ResultDto> {
    try {
      const res = await this.orderService.getByCustomer(customer);
      return new ResultDto('', true, res, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(null, false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async post(@Body() model: OrderItemDto[]): Promise<ResultDto> {
    try {
      const order = new Order();
      order.customer = '07338798885';
      order.date = new Date();
      order.orderNumber = '1B2D3F5';
      order.items = [];

      await this.orderService.post(order);

      for (const item of model) {
        const product = await this.productService.getById(item.product);
        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product = product;
        orderItem.price = product.price;
        orderItem.quantity = item.quantity;

        await this.orderItemService.post(orderItem);
      }

      return new ResultDto('', true, order, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(null, false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
