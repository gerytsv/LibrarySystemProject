import { UsersService } from '../../users/users.service';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { Role } from '../../database/entities/roles.entity';
import bcrypt from 'bcryptjs';


describe('User Service', () => {
    let service: UsersService;
    let usersRepository: any;
    let rolesRepository: any;

    beforeEach(async () => {

      usersRepository = {
        find() { /* empty */ },
        findOne() { /* empty */ },
        create() { /* empty */ },
        save() { /* empty */ },
      };
      rolesRepository = {
        find() { /* empty */ },
        findOne() { /* empty */ },
        save() { /* empty */ },
      };

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
        const spy2 = jest.spyOn(bcrypt, 'compare')
        .mockImplementation(() => true);

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
      const spy2 = jest.spyOn(bcrypt, 'compare')
      .mockImplementation(() => true);

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

    it('signIn should throw when the user is not found', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation( async () => null);
      const user = { username : 'user' , password: 'pass'};
      const spy2 = jest.spyOn(bcrypt, 'compare')
      .mockImplementation(() => true);

      // Act & Assert
      expect(service.signIn(user)).rejects.toThrowError();

    });

    it('signIn should throw when the password is wrong', async () => {

      // Arrange
      const spy = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation( async () => null);
      const user = { username : 'user' , password: 'pass'};
      const spy2 = jest.spyOn(bcrypt, 'compare')
      .mockImplementation(() => false);

      // Act & Assert
      expect(service.signIn(user)).rejects.toThrowError();

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

    it('createUser should call bcrypt hash method', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation(async () => [{username: '123'}]);
      // Act
      await service.createUser(user);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    });

    it('createUser should call bcrypt hash method with the correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation(async () => [{username: '123'}]);
      // Act
      await service.createUser(user);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith('pass' , 10);
    });

    it('createUser should call userRepository find method', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: '123'}]);
      // Act
      await service.createUser(user);

      // Assert
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('createUser should call userRepository find method with the correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: '123'}]);
      // Act
      await service.createUser(user);

      // Assert
      expect(usersRepository.find).toHaveBeenCalledWith({where: { username: 'user'}});
    });

    it('createUser should throw when the user already exist', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: 'user'}]);

      // Act & Assert
      expect(service.createUser(user)).rejects.toThrowError();

    });

    it('createUser should call userRepository create method', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: '123'}]);
      const spy4 = jest.spyOn( usersRepository, 'create');

      // Act
      await service.createUser(user);

      // Assert
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
    });

    it('createUser should call userRepository create method with the correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash').mockImplementation(async () => '123');
      const spy2 = jest.spyOn(rolesRepository, 'findOne')
      .mockImplementation( () => '123');
      const user = { username : 'user' , password: 'pass'};
      const userToCreate = {
        username: 'user',
        password: '123',
        roles: [
          '123',
        ],
        reviews: Promise.resolve([]),
        borrowedBooks: Promise.resolve([]),
        returnedBooks: Promise.resolve([]),
      };
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: '123'}]);
      const spy4 = jest.spyOn( usersRepository, 'create');

      // Act
      await service.createUser(user);

      // Assert
      expect(usersRepository.create).toHaveBeenCalledWith(userToCreate);
    });

    it('createUser should call userRepository save method', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: '123'}]);
      const spy4 = jest.spyOn( usersRepository, 'create')
      .mockImplementation(() => '123');
      const spy5 = jest.spyOn( usersRepository, 'save');

      // Act
      await service.createUser(user);

      // Assert
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('createUser should call userRepository save method with the correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(bcrypt, 'hash');
      const spy2 = jest.spyOn(rolesRepository, 'findOne');
      const user = { username : 'user' , password: 'pass'};
      const spy3 = jest.spyOn(usersRepository, 'find')
      .mockImplementation( async () => [{username: '123'}]);
      const spy4 = jest.spyOn( usersRepository, 'create')
      .mockImplementation(() => '123');
      const spy5 = jest.spyOn( usersRepository, 'save');

      // Act
      await service.createUser(user);

      // Assert
      expect(usersRepository.save).toHaveBeenCalledWith('123');
    });

    it('updateUserRoles should call rolesRepository findOne', async () => {

      // Arrange
      const spy = jest.spyOn(rolesRepository, 'findOne');
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => ({ id: '123', username : 'user' , password: 'pass' , roles: []}) );
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
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => ({ id: '123', username : 'user' , password: 'pass' , roles: []}) );
      const spy3 = jest.spyOn(usersRepository , 'save')
      .mockImplementation(async () => ({ id: '123', username : 'user' , password: 'pass' , roles: [ '123']}));
      // Act
      await service.updateUserRoles( {roles : ['test']}, '123');

      // Assert
      expect(rolesRepository.findOne).toHaveBeenCalledWith({where: {name: 'test'}});
    });

    it('delete should call usersRepository findOne method', async () => {

      // Arrange
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => ({ isDeleted: false }));
      const spy3 = jest.spyOn(usersRepository , 'save');

      // Act
      await service.delete('123');

      // Assert
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.findOne).toHaveBeenCalledWith({where: {id: '123', isDeleted: false}});
    });

    it('delete should call usersRepository findOne method with the correct parameters', async () => {

      // Arrange
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => ({ isDeleted: false }));
      const spy3 = jest.spyOn(usersRepository , 'save');

      // Act
      await service.delete('123');

      // Assert
      expect(usersRepository.findOne).toHaveBeenCalledWith({where: {id: '123', isDeleted: false}});
    });

    it('delete should call usersRepository save method', async () => {

      // Arrange
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => ({ isDeleted: false }));
      const spy3 = jest.spyOn(usersRepository , 'save');

      // Act
      await service.delete('123');

      // Assert
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('delete should call usersRepository save method with the correct paramaters', async () => {

      // Arrange
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => ({ isDeleted: false }));
      const spy3 = jest.spyOn(usersRepository , 'save');

      // Act
      await service.delete('123');

      // Assert
      expect(usersRepository.save).toHaveBeenCalledWith({ isDeleted: true });
    });

    it('delete should throw when the user is not found', async () => {

      // Arrange
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => null);
      const spy3 = jest.spyOn(usersRepository , 'save');

      // Act & Assert
      expect(service.delete('123')).rejects.toThrowError();
    });

    it('validate should call userRepository findOne method', async () => {

      // Arrange
      const spy2 = jest.spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => null);
      const spy3 = jest.spyOn(usersRepository , 'save');

      // Act
      await service.validate({username: 'username'});

      // Assert
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

});
