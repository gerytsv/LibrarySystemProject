import { User } from './../database/entities/users.entity';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  HttpStatus,
  HttpCode,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './models/create-user.dto';
import { ShowUserDTO } from './models/show-user.dto';
import { UpdateUserRoleDTO } from './models/update-user-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('api/users')
export class UsersController {
  public constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // For all private fields out there
  public async getAll(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  @Post() // Register and Login are the only ones that are not private
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  public async register(@Body(new ValidationPipe({ transform: true, whitelist: true })) body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Post('/:id')
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  public async updateRole(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: UpdateUserRoleDTO,
    @Param('id') id: string,
  ) {
    return await this.userService.updateUserRoles(body, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  public async deleteUser(@Param('id') userId: string) {
    return await this.userService.delete(userId);
  }
}
