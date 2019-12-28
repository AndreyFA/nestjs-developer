import { Injectable } from '@nestjs/common';

import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
  errors: any[];

  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.cardNumber, 16, 'Número do cartão inválido');
    flunt.isRequired(model.expiration, 'Informe a data de válidade');
    flunt.hasMinLen(model.holder, 5, 'Nome inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
