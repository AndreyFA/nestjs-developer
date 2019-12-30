import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/modules/backoffice/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) { }

  async createToken() {
    const user: JwtPayload = {
      document: '38226546800',
      email: 'andrey@email.com',
      image: 'assets/images/user.png',
      roles: ['admin'],
    };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return payload;
    // return await this.accountService.findOneByUsername(payload.document);
  }
}
