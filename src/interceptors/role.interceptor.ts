import { NestInterceptor, Injectable, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const user: JwtPayload = context.switchToHttp().getRequest().user;

        let hasRoles = false;
        user.roles.forEach((role) => {
            if (this.roles.includes(role)) {
                hasRoles = true;
            }
        });

        if (!hasRoles) {
            throw new HttpException('Accesso não autorizado', HttpStatus.FORBIDDEN);
        }

        return next.handle();
    }
}
