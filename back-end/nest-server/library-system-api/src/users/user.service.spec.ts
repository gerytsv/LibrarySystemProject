import { UsersService } from './users.service';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/users.entity';
import { Role } from '../database/entities/roles.entity';
import bcrypt from 'bcryptjs';

describe('UsersService', () => {
    let service: UsersService;
    const usersRepository = {
      find() { /* empty */ },
      findOne() { /* empty */ },
      create() { /* empty */ },
      save() { /* empty */ },
    };
    const rolesRepository = {
      find() { /* empty */ },
      findOne() { /* empty */ },
      save() { /* empty */ },
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          {
            provide: getRepositoryToken(User),
            useValue: usersRepository,
          },
          {
            provide: getRepositoryToken(Role),
            useValue: rolesRepository,
          },

        ],
      }).compile();

      service = module.get<UsersService>(UsersService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {

      expect(service).toBeDefined();

    });

    it('signIn should call userRepository findOne method', async () => {

        // Arrange
        const spy = jest.spyOn(usersRepository, 'findOne')
        .mockImplementation( async () => ({ username : 'user' , password: 'pass'}));
        const user = { username : 'user' , password: 'pass'};

        // Act
        await service.signIn(user);

        // Assert
        expect(usersRepository.findOne).toHaveBeenCalledTimes(1);

    });

    it('signIn should call userRepository findOne method with correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation( async () => ({ username : 'user' , password: 'pass'}));
      const user = { username : 'user' , password: 'pass'};

      // Act
      await service.signIn(user);

      // Assert
      expect(usersRepository.findOne).toHaveBeenCalledWith({
          where: {
          username: user.username,
        }
      });
    });

    it('signIn should return the correct value', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation( async () => ({ username : 'user' , password: 'pass'}));
      const user = { username : 'user' , password: 'pass'};
      const spy2 = jest.spyOn(bcrypt, 'compare')
      .mockImplementation(() => true);

      // Act
      const response = await service.signIn(user);

      // Assert
      expect(response).toEqual({ username : 'user' , password: 'pass'});
    });

    it('allUsers should call userRepository find method', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'find');

      // Act
      await service.allUsers();

      // Assert
      expect(spy).toHaveBeenCalledTimes(1);

    });

    it('allUsers should call userRepository find method with the correct paramaters', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'find');

      // Act
      await service.allUsers();

      // Assert
      expect(spy).toHaveBeenCalledWith({where: { isDeleted: false}});

    });

    it('allUsers should return the correct value', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => ('test'));

      // Act
      const response = await service.allUsers();

      // Assert
      expect(response).toEqual('test');
    });

    it('updateUserRoles should call rolesRepository findOne', async () => {

      // Arrange
      const spy = jest.spyOn(rolesRepository, 'findOne');
      const spy2 = jest.spyOn(usersRepository, 'findOne');
      const spy3 = jest.spyOn(usersRepository , 'save')
      .mockImplementation(async () => ({ id: '123', username : 'user' , password: 'pass' , roles: [ '123']}));

      // Act
      await service.updateUserRoles( {roles : ['test']}, '123');

      // Assert
      expect(rolesRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('updateUserRoles should call rolesRepository findOne with correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(rolesRepository, 'findOne');
      const spy2 = jest.spyOn(usersRepository, 'findOne');
      const spy3 = jest.spyOn(usersRepository , 'save')
      .mockImplementation(async () => ({ id: '123', username : 'user' , password: 'pass' , roles: [ '123']}));
      // Act
      await service.updateUserRoles( {roles : ['test']}, '123');

      // Assert
      expect(rolesRepository.findOne).toHaveBeenCalledWith({where: {name: 'test'}});
    });

});
