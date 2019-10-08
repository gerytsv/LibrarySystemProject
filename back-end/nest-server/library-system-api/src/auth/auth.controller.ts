import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserLoginDTO } from '../users/models/login-user.dto';
// import { ApiUseTags } from '@nestjs/swagger';

@Controller('session')
// @ApiUseTags('Auth Controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: UserLoginDTO,
  ): Promise<{ token: string }> {
    const token = await this.authService.signIn(user);
    if (!token) {
      throw new BadRequestException(`Invalid email and/or password!`);
    }

    return { token };
  }
}
