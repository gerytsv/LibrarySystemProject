import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './models/create-user.dto';
import { Role } from '../database/entities/roles.entity';
import { UserRole } from './enums/user-roles.enum';
import { UpdateUserRoleDTO } from './models/update-user-role.dto';
import { ShowUserDTO } from './models/show-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  public async createUser(body: CreateUserDTO): Promise<ShowUserDTO> {
    const username = body.username;
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = {
        username,
        password: hashedPassword,
        roles: [await this.rolesRepository.findOne({where: {name: UserRole.Basic}})]
    };

    const userEntity = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(userEntity);
    return {
      id: savedUser.id,
      username: savedUser.username,
      roles: savedUser.roles.map(role => role.name),
    };
  }

  public async updateUserRoles(
    body: UpdateUserRoleDTO,
    id: string,
  ): Promise<ShowUserDTO> {
    // tslint:disable-next-line: prefer-const
    let validRoles: Role[] = [];
    let roleToPush: Role;

    body.roles.forEach(async (role: string) => {
      roleToPush = await this.rolesRepository.findOne({
        where: { name: role },
      });
      if (roleToPush !== null) {
        validRoles.push(roleToPush);
      }
    });
    // tslint:disable-next-line: object-literal-shorthand
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.roles = validRoles;
    const createdUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(createdUser);

    return {
      id: savedUser.id,
      username: savedUser.username,
      roles: savedUser.roles.map(role => role.name),
    };
  }
}
