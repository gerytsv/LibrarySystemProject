import { CreateUserDTO } from '../../users/models/create-user.dto';
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
import { TestingModule, Test } from '@nestjs/testing';
describe('AuthController Tests', () => {
  let controller: AuthController;
  let service: any;
  beforeEach(async () => {
    service = {
      signIn() {
        /* empty */
      },
      validateUser() {
        /* empty */
      },
      blackListToken() {
        /* empty */
      },
      isTokenBlacklisted() {
        /* empty */
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    // AAA
    expect(controller).toBeDefined();
  });

  describe('login() should', () => {
    it('call authService.signIn() with the passed user', async () => {
      // Arrange
      const user = { username: 'test', password: '123Ab' };
      const spy = jest
        .spyOn(service, 'signIn')
        .mockImplementation(async () => 'test');

      // Act
      await controller.login(user);
      // Assert
      expect(service.signIn).toHaveBeenCalledTimes(1);
      expect(service.signIn).toHaveBeenLastCalledWith(user);

      spy.mockClear();
    });

    it('return the result from authService.signIn()', async () => {
      // Arrange
      const user: CreateUserDTO = { username: 'test', password: '123Ab' };
      const spy = jest
        .spyOn(service, 'signIn')
        .mockImplementation(async () => 'testing');
      // Act
      const result = await controller.login(user);
      // Assert
      expect(result).toEqual({ token: 'testing' });

      spy.mockClear();
    });
  });
  describe('logout()', async () => {
    it('should call authService.blackListToken() with the passed token', async () => {
      // Arrange
      const token: string = 'fakeToken';
      const spy = jest.spyOn(service, 'blackListToken');
      // Act
      await controller.logout(token);
      // Assert
      expect(service.blackListToken).toHaveBeenCalledTimes(1);
      expect(service.blackListToken).toHaveBeenCalledWith(token);

      spy.mockClear();
    });

    it('should return a message if the logout was successful', async () => {
      // Arrange
      const token: string = 'fakeToken';
      const spy = jest.spyOn(service, 'blackListToken');
      // Act
      const result: { msg: string } = await controller.logout(token);
      // Assert
      expect(result).toEqual({ msg: 'Logout successful!' });
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockClear();
    });
  });
});
