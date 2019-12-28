import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { CreditCard } from 'src/modules/backoffice/models/credit-card.model';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Customer>,
  ) {}

  async create(document: string, data: CreditCard): Promise<Customer> {
    const options = { upsert: true };
    return this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          creditCard: data,
        },
      },
      options,
    );
  }
}
