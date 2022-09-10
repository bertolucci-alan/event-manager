import { Institute, User } from '@src/database/entity';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';
import { InstituteRepository } from '../../repositories/InstituteRepository';
import { CreateInstituteUseCase } from './CreateInstituteUseCase';

const instituteRepositoryMock = mock<InstituteRepository>();
const userRepositoryMock = mock<UserRepository>();

const date = new Date();

describe('Create Institute useCase unit test', () => {
  beforeEach(async () => {
    await new InstituteRepository().deleteAll();
    await new UserRepository().deleteAll();
  });

  it('should return successfully when create a new institute', async () => {
    const newUser: Partial<User> = {
      name: 'Alan',
      email: 'alan2@gmail.com',
      password: '123123123',
      balance: 0,
      isAdmin: false,
    };

    const user = await new UserRepository().create(newUser);

    const newInstitute: Institute = {
      id: 1,
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
    const response = await createInstitute.execute(
      { name: newInstitute.name, CNPJ: newInstitute.CNPJ },
      newInstitute.owner.id
    );

    expect(response).toEqual(newInstitute);
  });
});
