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
import { UserLoginDTO } from './models/login-user.dto';
import { JwtPayload } from '../common/types/jwt-payload';
import { ReturnUserDTO } from './models/return-user.dto';
import { SystemError } from '../common/exceptions/system.error';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  public async signIn(user: UserLoginDTO): Promise<User> {
    const foundUser: User = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    // Password validation
    if (bcrypt.compare(foundUser.password, user.password)) {
      return foundUser;
    } else {
      throw new SystemError('Invalid password!', 400);
    }
  }

  public async allUsers(): Promise<User[]> {
    return await this.userRepository.find({where: { isDeleted: false}});
  }

  public async createUser(body: CreateUserDTO) {
    const username = body.username;
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = {
      username,
      password: hashedPassword,
      roles: [
        await this.rolesRepository.findOne({ where: { name: UserRole.Basic } }),
      ],
      reviews: Promise.resolve([]),
      borrowedBooks: Promise.resolve([]),
      returnedBooks: Promise.resolve([]),
    };

    const userEntity = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(userEntity);
    return {
      id: savedUser.id,
      username: savedUser.username,
      roles: savedUser.roles.map(role => role.name),
    };
  }

  public async updateUserRoles(body: UpdateUserRoleDTO, id: string) {
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

    const user = await this.userRepository.findOne({ where: { id } });
    user.roles = validRoles;
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
      roles: savedUser.roles.map(role => role.name),
    };
  }

  public async validate(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({username: payload.username});
  }
}
