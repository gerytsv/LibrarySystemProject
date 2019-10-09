import { AuthService } from './../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  CanActivate,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuardWithBlacklisting extends AuthGuard('jwt')
  implements CanActivate {
  public constructor(private readonly authService: AuthService) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!(await super.canActivate(context))) {
      return false;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (this.authService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
