import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  CacheInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Md5 } from 'md5-typescript';

import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/customer/create-customer.dto';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { User } from 'src/modules/backoffice/models/user.model';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';
import { UpdateCustomerContract } from 'src/modules/backoffice/contracts/customer/update-customer.contract';
import { QueryContract } from '../contracts/query.contract';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto): Promise<Result> {
    try {
      const saltKey = await this.configService.get('SALT_KEY');
      const password = await Md5.init(`${model.password}${saltKey}`);

      const user = await this.accountService.create(
        new User(
          model.document,
          password,
          true,
          ['user']),
      );
      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        user,
        [],
        null,
        null,
        null,
      );

      const res = await this.customerService.create(customer);
      return new Result('Cliente criado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Algo deu errado', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async put(
    @Param('document') document: string,
    @Body() model: CreateCustomerDto,
  ): Promise<Result> {
    try {
      const res = await this.customerService.update(document, model);
      return new Result('Cliente atualizado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Algo deu errado', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAll(): Promise<Result> {
    try {
      const res = await this.customerService.findAll();
      return new Result('Clientes obtidos com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível atualizar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':document')
  async get(@Param('document') document: string): Promise<Result> {
    try {
      const res = await this.customerService.find(document);
      return new Result('Cliente obtido com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível atualizar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
  async query(@Body() model: QueryDto) {
    try {
      const res = await this.customerService.query(model);
      return new Result('Query executada com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível atualizar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
