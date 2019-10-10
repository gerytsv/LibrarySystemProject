import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './models/create-user.dto';
import { Role } from '../database/entities/roles.entity';
import { UserRole } from '../common/enums/user-roles.enum';
import { UpdateUserRoleDTO } from './models/update-user-role.dto';
import bcrypt from 'bcryptjs';
import { UserLoginDTO } from './models/login-user.dto';
import { JwtPayload } from '../common/types/jwt-payload';
import { SystemError } from '../common/exceptions/system.error';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  public async signIn(user: UserLoginDTO) {
    const foundUser: User = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (!foundUser) {
      throw new SystemError('No such user!', 404);
    }
    if (await bcrypt.compare(user.password, foundUser.password)) {
      return foundUser;
    } else {
      throw new SystemError('Invalid password!', 400);
    }
  }

  public async allUsers() {
    return await this.userRepository.find({ where: { isDeleted: false } });
  }

  public async createUser(body: CreateUserDTO) {
    const username = body.username;
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const users = await this.userRepository.find({ where: { username } });
    const exist = users.some(item => item.username === username);

    if (exist) {
      throw new SystemError('Username already exist', 400);
    }

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
    return await this.userRepository.save(userEntity);
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

    return savedUser;
  }

  public async delete(userId: string) {
    const user = await this.userRepository.findOne({where : { id: userId, isDeleted: false }});
    if (!user) {
      throw new SystemError('The user is not found' , 404);
    }

    user.isDeleted = true;
    await this.userRepository.save(user);
    return { messege: 'User deleted succesfully'};
  }

  public async validate(payload: JwtPayload): Promise<User> {
    return await this.userRepository.findOne({ username: payload.username });
  }
}
