import { Injectable } from '@nestjs/common';

import { Contract } from 'src/modules/backoffice/contracts/contract';
import { Flunt } from 'src/utils/flunt';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new Flunt();

    if (!model.query) {
      model.query = {};
    }

    flunt.isGreaterThan(model.take, 1000, 'Limite de 1000 itens por pesquisa');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
