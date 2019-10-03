import { JwtPayload } from './../common/types/jwt-payload';
import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from '../users/models/login-user.dto';
import { User } from '../database/entities/users.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async signIn(user: UserLoginDTO): Promise<string> {
    const userFound = await this.usersService.signIn(user);
    if (userFound) {
      // Returning the token
      return await this.jwtService.signAsync({
        username: userFound.username,
      } as JwtPayload);
    }

    return null;
  }

  public async validateUser(payload: JwtPayload): Promise<User> {
    return await this.usersService.validate(payload);
  }
}
