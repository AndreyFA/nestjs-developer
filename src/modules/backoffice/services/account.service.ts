import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/modules/backoffice/models/user.model';
import { Customer } from '../models/customer.model';
import { CustomerService } from './customer.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly model: Model<User>,
    private readonly customerService: CustomerService) { }

  async create(data: User): Promise<User> {
    const user = new this.model(data);
    return await user.save();
  }

  async authenticate(username: string, password: string): Promise<Customer> {
    return this.customerService.authenticate(username, password);
  }
}
