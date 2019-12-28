import {
  Controller,
  Post,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreditCardService } from '../services/credit-card.service';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';
import { CreateCreditCardContract } from 'src/modules/backoffice/contracts/credit-card/create-credit-card.contract';

@Controller('v1/credit-cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async addBillingAddress(
    @Param('document') document: string,
    @Body() model: CreditCard,
  ): Promise<Result> {
    try {
      const res = await this.creditCardService.create(document, model);
      return new Result(
        'Cartão de crédito adicionado com sucesso!',
        true,
        res,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          'Ops! Não foi possível adicionar o cartão de crédito',
          false,
          null,
          error,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
