import { User } from './../database/entities/users.entity';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './models/create-user.dto';
import { ShowUserDTO } from './models/show-user.dto';
import { UpdateUserRoleDTO } from './models/update-user-role.dto';

@Controller('api/users')
export class UsersController {
  public constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() body: CreateUserDTO): Promise<ShowUserDTO> {
    return this.userService.createUser(body);
  }

  @Post('/:id')
  public async updateRole(
    @Body() body: UpdateUserRoleDTO,
    @Param('id') id: string,
  ): Promise<ShowUserDTO> {
    return await this.userService.updateUserRoles(body, id);
  }
}
