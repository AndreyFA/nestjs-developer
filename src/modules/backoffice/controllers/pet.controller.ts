import {
  Controller,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { CreatePetContract } from 'src/modules/backoffice/contracts/pet/create-pet.contract';
import { PetService } from '../services/pet.service';

@Controller('v1/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async create(
    @Param('document') document: string,
    @Body() model: Pet,
  ): Promise<Result> {
    try {
      const res = await this.petService.create(document, model);
      return new Result('Pet adicionado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível adicionar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async update(
    @Param('document') document: string,
    @Param('id') id: string,
    @Body() model: Pet,
  ): Promise<Result> {
    try {
      const res = await this.petService.update(document, id, model);
      return new Result('Pet atualizado com sucesso!', true, res, null);
    } catch (error) {
      throw new HttpException(
        new Result('Ops! Não foi possível atualizar o pet', false, null, error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
