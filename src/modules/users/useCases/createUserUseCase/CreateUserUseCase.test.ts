import { User } from '@src/database/entity';
import { mock } from 'jest-mock-extended';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { UserRepository } from '../../repositories/UserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

const userRepositoryMock = mock<UserRepository>();
const date = new Date();

describe('Create User UseCase unit test', () => {
  it('should successfly when create a new user', async () => {
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

    userRepositoryMock.create.mockResolvedValue(newUser);

    const createUser = new CreateUserUseCase(userRepositoryMock);
    const response = await createUser.execute(newUser);

    expect(response).toEqual(newUser);
  });

  it('should bad request error when there is incompleted params', async () => {
    const newUser: Partial<CreateUserDTO> = {
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
    };
    userRepositoryMock.create.mockRejectedValue({
      name: 'Bad Request',
      status: 400,
      message: 'Validation failed',
      errors: [
        {
          property: 'name',
          validationOptions: [
            'name should not be empty',
            'name must be a string',
          ],
        },
      ],
    });
    const createUser = new CreateUserUseCase(userRepositoryMock);
    await expect(createUser.execute(newUser as CreateUserDTO)).rejects.toEqual({
      name: 'Bad Request',
      status: 400,
      message: 'Validation failed',
      errors: [
        {
          property: 'name',
          validationOptions: [
            'name should not be empty',
            'name must be a string',
          ],
        },
      ],
    });
  });

  it('should return 500 when duplicated key', async () => {
    const newUser: CreateUserDTO = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
    };
    userRepositoryMock.create.mockRejectedValue(
      "Error during user creation: QueryFailedError: ER_DUP_ENTRY: Duplicate entry 'alan@gmail.com' for key 'IDX_97672ac88f789774dd47f7c8be'"
    );
    const createUser = new CreateUserUseCase(userRepositoryMock);

    await expect(createUser.execute(newUser)).rejects.toEqual(
      "Error during user creation: QueryFailedError: ER_DUP_ENTRY: Duplicate entry 'alan@gmail.com' for key 'IDX_97672ac88f789774dd47f7c8be'"
    );
  });
});
