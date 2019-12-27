import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';

import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer.contracts';
import { CreateCustomerDto } from '../dtos/create-customer-dto';

@Controller('v1/customers')
export class CustomerController {
    @Get()
    get(): Result {
        return new Result(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document: string): Result {
        return new Result(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    post(@Body() customer: CreateCustomerDto): Result {
        return new Result('Cliente cadastrado com sucesso!', true, customer, null);
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() customer: Customer): Result {
        return new Result('Cliente atualizado com sucesso!', true, customer, null);
    }

    @Delete(':document')
    delete(@Param() document: string): Result {
        return new Result('Cliente removido com sucesso!', true, null, null);
    }
}
