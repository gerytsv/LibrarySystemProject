import { TestingModule, Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('User Controller', () => {
    let controller: UsersController;
    const userService = {
      allUsers() { /* empty */ },
      createUser() { /* empty */ },
      updateUserRoles() { /* empty */ }
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          PassportModule.register({defaultStrategy: 'jwt'}),
        ],
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: userService,
          },
        ],
      }).compile();

      controller = module.get<UsersController>(UsersController);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should be defined', () => {

      expect(controller).toBeDefined();

    });

    it('getAll should call UsersService.allUsers', async () => {

        // Arrange
        const spy = jest.spyOn(userService, 'allUsers');

        // Act
        await controller.getAll();

        // Assert
        expect(userService.allUsers).toHaveBeenCalledTimes(1);

    });

    it('getAll should return the correct value', async () => {

        // Arrange
        const spy = jest.spyOn(userService, 'allUsers').mockImplementation(async () => 'test');

        // Act
        const response = await controller.getAll();

        // Assert
        expect(response).toBe('test');

    });

    it('register should call UsersService.createUser', async () => {

        // Arrange
        const spy = jest.spyOn(userService, 'createUser');
        const user = { username : 'user' , password: 'pass'};

        // Act
        await controller.register(user);

        // Assert
        expect(userService.createUser).toHaveBeenCalledTimes(1);

    });

    it('register should call UsersService.createUser with the correct parameters', async () => {

        // Arrange
        const spy = jest.spyOn(userService, 'createUser');
        const user = { username : 'user' , password: 'pass'};

        // Act
        await controller.register(user);

        // Assert
        expect(userService.createUser).toHaveBeenCalledWith(user);

    });

    it('register should return the correct value', async () => {

      // Arrange
      const spy = jest.spyOn(userService, 'createUser').mockImplementation(async () => 'test');
      const user = { username : 'user' , password: 'pass'};

      // Act
      const response = await controller.register(user);

      // Assert
      expect(response).toBe('test');

    });

    it('updateRole should call UsersService.updateUserRoles', async () => {

      // Arrange
      const spy = jest.spyOn(userService, 'updateUserRoles');

      // Act
      await controller.updateRole({ roles: ['Admin'] }, '123');

      // Assert
      expect(userService.updateUserRoles).toHaveBeenCalledTimes(1);

    });

    it('updateRole should call UsersService.updateUserRoles with the correct parameters', async () => {

      // Arrange
      const spy = jest.spyOn(userService, 'updateUserRoles');

      // Act
      await controller.updateRole({ roles: ['Admin'] }, '123');

      // Assert
      expect(userService.updateUserRoles).toHaveBeenCalledWith({ roles: ['Admin'] }, '123');

    });

    it('updateRole should return the correct value', async () => {

      // Arrange
      const spy = jest.spyOn(userService, 'updateUserRoles').mockImplementation(async () => 'test');

      // Act
      const response = await controller.updateRole({ roles: ['Admin'] }, '123');
      // Assert
      expect(response).toBe('test');

    });
});
