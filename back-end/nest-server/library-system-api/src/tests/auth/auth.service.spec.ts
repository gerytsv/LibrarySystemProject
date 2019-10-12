import { ValidationPipe } from '@nestjs/common';
import { JwtPayload } from './../../common/types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/users.service';
import { UserLoginDTO } from '../../users/models/login-user.dto';
import { SystemError } from '../../common/exceptions/system.error';
import { User } from '../../database/entities/users.entity';
describe('AuthService', () => {
  let authService: AuthService;
  let usersDataService: any;
  let jwtService: any;

  beforeEach(async () => {
    usersDataService = {
      signIn() {
        /* Empty */
      },
      allUsers() {
        /* empty */
      },
      createUser() {
        /* empty */
      },
      updateUserRoles() {
        /* empty */
      },
      delete() {
        /* empty */
      },
      validate() {
        /* empty */
      },
    };

    jwtService = {
      signAsync() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersDataService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(authService).toBeDefined();
  });
  describe('signIn()', () => {
    it('should call usersService.signIn with user once', async () => {
      // Arrange
      const fakeUser: UserLoginDTO = {
        username: 'test',
        password: '123Ab',
      };
      const fakeFoundUser = new User();
      const spy = jest
        .spyOn(usersDataService, 'signIn')
        .mockReturnValue(fakeFoundUser);

      // Act
      await authService.signIn(fakeUser);
      // Assert
      expect(usersDataService.signIn).toBeCalledWith(fakeUser);
      expect(usersDataService.signIn).toBeCalledTimes(1);

      spy.mockClear();
    });

    it('should throw if no user is found', async () => {
      // Arrange
      const fakeUser: UserLoginDTO = {
        username: 'test',
        password: '123Ab',
      };
      const spy = jest
        .spyOn(usersDataService, 'signIn')
        .mockImplementation(() => Promise.resolve(undefined));

      // Act & Assert
      expect(authService.signIn(fakeUser)).rejects.toThrow(SystemError);

      spy.mockClear();
    });
    it('should call jwtService.signAnync with correct payload', async () => {
      // Arrange
      const fakeFoundUser = new User();
      const fakeUser: UserLoginDTO = {
        username: 'test',
        password: '123Ab',
      };
      const spy = jest
        .spyOn(usersDataService, 'signIn')
        .mockImplementation(() => Promise.resolve(fakeFoundUser));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));
      // Act
      await authService.signIn(fakeUser);
      // Assert
      expect(signAsyncSpy).toBeCalledTimes(1);
      expect(signAsyncSpy).toBeCalledWith({
        username: fakeFoundUser.username,
      });

      spy.mockClear();
    });
    it('should return the token from jwtService.signAsync()', async () => {
      // Arrange
      const fakeFoundUser = new User();
      const fakeUser: UserLoginDTO = {
        username: 'test',
        password: '123Ab',
      };
      const spy = jest
        .spyOn(usersDataService, 'signIn')
        .mockImplementation(() => Promise.resolve(fakeFoundUser));
      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));
      // Act
      const output = await authService.signIn(fakeUser);
      // Assert
      expect(output).toEqual(fakeToken);

      spy.mockClear();
    });
  });
  describe('validateUser()', () => {
    it('should invoke usersService.validate with correct payload once', async () => {
      // Arrange
      const fakeUser = new User();
      const fakePayload: JwtPayload = { username: 'test' };
      const spy = jest.spyOn(usersDataService, 'validate');
      // Act
      await authService.validateUser(fakePayload);
      // Assert
      expect(usersDataService.validate).toHaveBeenCalledWith(fakePayload);
      expect(usersDataService.validate).toBeCalledTimes(1);

      spy.mockClear();
    });
  });
  describe('blackListToken', () => {
    it('should add the passed token to the backlist array', async () => {
      // Arrange
      const fakeToken = 'token';
      // Act
      authService.blackListToken(fakeToken);
      // Assert
      expect((authService as any).blacklist).toEqual([fakeToken]);
    });
  });
  describe('isTokeBlacklisted', () => {
    it('should return true if authService.blacklist includes the passed token', () => {
      // Arrange
      const fakeToken = 'token';
      // Act
      (authService as any).blacklist.push(fakeToken);
      const result = authService.isTokenBlacklisted(fakeToken);
      // Assert
      expect(result).toEqual(true);
    });
    it('should return false if authService.blacklist doesn\'t include the passed token', () => {
      // Arrange
      const fakeToken = 'token';
      // Act
      const result = authService.isTokenBlacklisted(fakeToken);
      // Assert
      expect(result).toEqual(false);
    });
  });
});
