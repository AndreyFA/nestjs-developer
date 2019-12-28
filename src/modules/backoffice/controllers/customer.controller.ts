import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Customer } from '../models/customer.model';
import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/create-customer.dto';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { User } from 'src/modules/backoffice/models/user.model';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
import { Address } from 'src/modules/backoffice/models/address.model';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/customer/create-address.contract';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { CreatePetContract } from 'src/modules/backoffice/contracts/customer/create-pet.contract';
import { QueryDto } from 'src/modules/backoffice/dtos/query.dto';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto): Promise<Result> {
    try {
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
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

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ): Promise<Result> {
    try {
      const res = await this.customerService.addBillingAddress(document, model);
      return new Result('Endereço atualizado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Ops! Não foi possível adicionar o endereço de cobrança',
          false,
          null,
          error,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ): Promise<Result> {
    try {
      const res = await this.customerService.addShippingAddress(
        document,
        model,
      );
      return new Result('Endereço atualizado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Ops! Não foi possível adicionar o endereço de entrega',
          false,
          null,
          error,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async createPet(
    @Param('document') document: string,
    @Body() model: Pet,
  ): Promise<Result> {
    try {
      const res = await this.customerService.createPet(document, model);
      return new Result('Pet adicionado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível adicionar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':document/pets/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ): Promise<Result> {
    try {
      const res = await this.customerService.updatePet(document, id, model);
      return new Result('Pet atualizado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível atualizar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
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
