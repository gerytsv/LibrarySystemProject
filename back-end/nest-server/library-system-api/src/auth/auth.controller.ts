import { AuthGuardWithBlacklisting } from './../common/guards/blacklist.guard';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserLoginDTO } from '../users/models/login-user.dto';
import { Token } from '../common/decorators/token.decorator';

@Controller('session')
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

  @Delete()
  @UseGuards(AuthGuardWithBlacklisting)
  public async logout(@Token() token: string) {
    this.authService.blackListToken(token);

    return {
      msg: 'Logout successful!',
    };
  }
}
