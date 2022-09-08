import { User } from '@src/database/entity';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { CreateUserUseCase } from './CreateUserUseCase';

export const repositoryMock = mock<Repository<any>>();

describe('Create User UseCase unit test', () => {
  it('should successfly when create a new user', async () => {
    const date = new Date();
    const newUser: User = {
      id: 1,
      name: 'du',
      email: 'alan@gmail.com',
      password: '123',
      balance: 0,
      isAdmin: false,
      created_at: date,
      updated_at: date,
    };
    repositoryMock.create.mockResolvedValue(newUser);
    const createUser = new CreateUserUseCase(repositoryMock);
    const response = await createUser.execute(newUser);
    expect(response).toEqual(newUser);
  });
});
