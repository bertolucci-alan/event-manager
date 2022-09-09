import { User } from '@src/database/entity';
import { mock } from 'jest-mock-extended';
import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

export const userRepositoryMock = mock<UserRepository>();
const date = new Date();

describe('Create User UseCase unit test', () => {
  it('should successfly when create a new user', async () => {
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
    userRepositoryMock.create.mockResolvedValue(newUser);

    const createUser = new CreateUserUseCase(userRepositoryMock);
    const response = await createUser.execute(newUser);

    expect(response).toEqual(newUser);
  });
});
