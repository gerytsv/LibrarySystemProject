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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './models/create-user.dto';
import { ShowUserDTO } from './models/show-user.dto';
import { UpdateUserRoleDTO } from './models/update-user-role.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UsersController {
  public constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // For all private fields out there
  @HttpCode(HttpStatus.OK)
  public async getAll(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  @Post() // Register and Login are the only ones that are not private
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body(new ValidationPipe({ transform: true, whitelist: true })) body: CreateUserDTO): Promise<ShowUserDTO> {
    return this.userService.createUser(body);
  }

  @Post('/:id')
  @UseGuards(AuthGuard('jwt'))
  public async updateRole(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: UpdateUserRoleDTO,
    @Param('id') id: string,
  ): Promise<ShowUserDTO> {
    return await this.userService.updateUserRoles(body, id);
  }
}
