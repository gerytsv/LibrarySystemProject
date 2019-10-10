import { JwtPayload } from './../common/types/jwt-payload';
import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from '../users/models/login-user.dto';
import { User } from '../database/entities/users.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SystemError } from '../common/exceptions/system.error';

@Injectable()
export class AuthService {
  private readonly blacklist: string[] = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async signIn(user: UserLoginDTO) {
    const userFound = await this.usersService.signIn(user);
    if (userFound && !userFound.isDeleted) {
      // Returning the token
      return await this.jwtService.signAsync({
        username: userFound.username,
      } as JwtPayload);
    }
    return null;
  }

  // For the strategy
  public async validateUser(payload: JwtPayload): Promise<User> {
    return await this.usersService.validate(payload);
  }

  public blackListToken(token: string): void {
    this.blacklist.push(token);
  }

  public isTokenBlacklisted(token: string): boolean {
    return this.blacklist.includes(token);
  }
}
