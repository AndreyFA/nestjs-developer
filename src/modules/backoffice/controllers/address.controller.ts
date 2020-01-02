import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';

import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Address } from 'src/modules/backoffice/models/address.model';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/address/create-address.contract';
import { AddressService } from '../services/address.service';
import { AddressType } from '../enums/address-type.enum';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ): Promise<Result> {
    try {
      const res = await this.addressService.create(
        document,
        model,
        AddressType.Billing,
      );
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

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document: string,
    @Body() model: Address,
  ): Promise<Result> {
    try {
      const res = await this.addressService.create(
        document,
        model,
        AddressType.Shipping,
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

  @Get('search/:zipcode')
  async search(@Param('zipcode') zipCode: string): Promise<Result> {
    try {
      const response = await this.addressService
        .getAddressByZipCode(zipCode)
        .toPromise();

      return new Result('CEP localizado', true, response.data, null);
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
}
