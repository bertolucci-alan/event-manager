import { User } from '@src/database/entity';
import { mock } from 'jest-mock-extended';
import { HashProvider } from '../../providers/HashProvider/HashProvider';
import { JWTProvider } from '../../providers/JWTProvider/JWTProvider';
import { UserRepository } from '../../repositories/UserRepository';
import { AuthenticateUseCase } from './AuthenticateUseCase';

const userRepositoryMock = mock<UserRepository>();
const hashProviderMock = mock<HashProvider>();
const jwtProviderMock = mock<JWTProvider>();
const jwtProvider = new JWTProvider();
const date = new Date();

describe('Authenticate Case unit test', () => {
  it('should return successfully when user authenticate', async () => {
    const newUser: User = {
      id: 55,
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
      isAdmin: false,
      created_at: date,
      updated_at: date,
      events: [],
      users_events: [],
      institutes: [],
    };

    const token = jwtProvider.generateToken({ id: newUser.id });

    userRepositoryMock.findByEmail.mockResolvedValue(newUser);
    hashProviderMock.comparePassword.mockResolvedValue(true);
    jwtProviderMock.generateToken.mockResolvedValue(token as never);

    const authCase = new AuthenticateUseCase(
      userRepositoryMock,
      hashProviderMock,
      jwtProvider
    );
    const response = await authCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.token).toEqual(expect.any(String));
    expect(response.user).toEqual(newUser);
  });

  it('should return null when not found an user', async () => {
    const user = {
      email: 'alan2@gmail.com',
      password: '123123123',
    };
    userRepositoryMock.findByEmail.mockRejectedValue(null);

    const authCase = new AuthenticateUseCase(
      userRepositoryMock,
      hashProviderMock,
      jwtProvider
    );

    await expect(
      authCase.execute({
        email: user.email,
        password: user.password,
      })
    ).rejects.toBeNull();
  });

  it('should return false when password does not match', async () => {
    const user: User = {
      id: 55,
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
      isAdmin: false,
      created_at: date,
      updated_at: date,
      events: [],
      users_events: [],
      institutes: [],
    };

    userRepositoryMock.findByEmail.mockResolvedValue(user);
    hashProviderMock.comparePassword.mockRejectedValue(false);

    const authCase = new AuthenticateUseCase(
      userRepositoryMock,
      hashProviderMock,
      jwtProvider
    );

    await expect(
      authCase.execute({
        email: user.email,
        password: user.password,
      })
    ).rejects.toBeFalsy();
  });
});
