import { Controller, Get, UseGuards, Post, Req, UseInterceptors, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth.service';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { RoleInterceptor } from 'src/interceptors/role.interceptor';
import { AccountService } from '../services/account.service';
import { Authenticate } from '../models/authenticate.model';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService) { }

  @Post('authenticate')
  async authenticate(@Body() model: Authenticate): Promise<any> {
    const customer = await this.accountService.authenticate(model.username, model.password);

    if (!customer) {
      throw new HttpException('Usuário inválido', HttpStatus.UNAUTHORIZED);
    }

    if (!customer.user.active) {
      throw new HttpException('Usuário inativo', HttpStatus.UNAUTHORIZED);
    }

    return await this.authService.createToken();
  }

  @Post('reset-password')
  async resetPassword(@Body() model: any): Promise<any> {
    try {
      return {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
