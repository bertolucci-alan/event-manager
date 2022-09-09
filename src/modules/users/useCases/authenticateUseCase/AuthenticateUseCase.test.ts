import { User } from '@src/database/entity';
import { mock } from 'jest-mock-extended';
import { HashProvider } from '../../providers/HashProvider/HashProvider';
import { UserRepository } from '../../repositories/UserRepository';
import { AuthenticateUseCase } from './AuthenticateUseCase';

const userRepositoryMock = mock<UserRepository>();
const hashProviderMock = mock<HashProvider>();
const date = new Date();

describe('Authenticate Case unit test', () => {
  it('should return successfully when user authenticate', async () => {
    const newUser: User = {
      id: 1,
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
      isAdmin: false,
      created_at: date,
      updated_at: date,
    };

    userRepositoryMock.findByEmail.mockResolvedValue(newUser);
    hashProviderMock.comparePassword.mockResolvedValue(true);

    const authCase = new AuthenticateUseCase(
      userRepositoryMock,
      hashProviderMock
    );
    const response = await authCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.token).toEqual(expect.any(String));
    expect(response.user).toEqual(newUser);
  });
});
