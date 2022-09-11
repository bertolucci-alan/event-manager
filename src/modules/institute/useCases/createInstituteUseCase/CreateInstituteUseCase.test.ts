import { Institute, User } from '@src/database/entity';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';
import { InstituteRepository } from '../../repositories/InstituteRepository';
import { CreateInstituteUseCase } from './CreateInstituteUseCase';

const instituteRepositoryMock = mock<InstituteRepository>();
const userRepositoryMock = mock<UserRepository>();
const date = new Date();

describe('Create Institute useCase unit test', () => {
  it('should return successfully when create a new institute', async () => {
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

    const newInstitute: Institute = {
      id: 30,
      name: 'Escola de Samba',
      CNPJ: 'XX. XXX. XXX/0001-XX',
      owner: user,
      created_at: date,
      updated_at: date,
      events: [],
      ownerId: 0,
    };

    instituteRepositoryMock.create.mockResolvedValue(newInstitute);

    userRepositoryMock.findById.mockResolvedValue(user);

    const createInstitute = new CreateInstituteUseCase(
      userRepositoryMock,
      instituteRepositoryMock
    );

    const institute = await createInstitute.execute(
      { name: newInstitute.name, CNPJ: newInstitute.CNPJ },
      user.id
    );

    expect(institute).toEqual(newInstitute);
  });

  it('should return 404 when the user not found', async () => {
    const createInstitute = new CreateInstituteUseCase(
      userRepositoryMock,
      instituteRepositoryMock
    );
    await expect(
      createInstitute.execute({ name: 'fake-name', CNPJ: 'fake-cnpj' }, 0)
    ).rejects.toEqual({
      message: 'User not found',
      statusCode: 404,
    });
  });
});
