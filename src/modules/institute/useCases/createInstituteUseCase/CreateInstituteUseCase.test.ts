import { Institute, User } from '@src/database/entity';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';
import { InstituteRepository } from '../../repositories/InstituteRepository';
import { CreateInstituteUseCase } from './CreateInstituteUseCase';

const instituteRepositoryMock = mock<InstituteRepository>();
const userRepositoryMock = mock<UserRepository>();

const date = new Date();

describe('Create Institute useCase unit test', () => {
  it.only('should return successfully when create a new institute', async () => {
    // userRepositoryMock.findById.mockReset();
    // instituteRepositoryMock.create.mockReset();
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
    };

    userRepositoryMock.findById.mockResolvedValue(user);

    const newInstitute: Institute = {
      id: 30,
      name: 'Escola de Samba',
      CNPJ: 'XX. XXX. XXX/0001-XX',
      owner: user,
      created_at: date,
      updated_at: date,
    };

    instituteRepositoryMock.create.mockResolvedValue(newInstitute);

    const createInstitute = new CreateInstituteUseCase(
      userRepositoryMock,
      instituteRepositoryMock
    );

    expect(
      await createInstitute.execute(
        { name: newInstitute.name, CNPJ: newInstitute.CNPJ },
        newInstitute.owner.id
      )
    ).toEqual(newInstitute);
  });
});
