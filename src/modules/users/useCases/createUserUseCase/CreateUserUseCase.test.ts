import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

jest.mock('@src/modules/users/repositories/UserRepository');

describe('Create User UseCase unit test', () => {
  const mockedUserRepository =
    new UserRepository() as jest.Mocked<UserRepository>;
  it('should successfly when create a new user', async () => {
    const date = new Date();
    const newUser: any = {
      id: 1,
      name: 'du',
      email: 'alan@gmail.com',
      password: '123',
      balance: 0,
      isAdmin: false,
      created_at: date,
      updated_at: date,
    };

    mockedUserRepository.create.mockResolvedValue(newUser);
    const createUserUseCase = new CreateUserUseCase(mockedUserRepository);

    const response = await createUserUseCase.execute(newUser);

    expect(response).toEqual(newUser);
  });
});
