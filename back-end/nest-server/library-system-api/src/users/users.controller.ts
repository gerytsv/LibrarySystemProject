import { Controller, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './models/create-user.dto';
import { ShowUserDTO } from './models/show-user.dto';
import { UpdateUserRoleDTO } from './models/update-user-role.dto';

@Controller('api/users')
export class UsersController {

    public constructor(private readonly userService: UsersService) {}

    @Post()
    public async register(@Body() body: CreateUserDTO): Promise<ShowUserDTO> {
        return this.userService.createUser(body);
    }

    @Post('/:id')
    public async updateRole(@Body() body: UpdateUserRoleDTO, @Param('id') id: string): Promise<ShowUserDTO> {
        return await this.userService.updateUserRoles(body, id);
    }

}
