import { Institute, User } from '@src/database/entity';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { CreateUserDTO } from '@src/modules/users/dtos/CreateUserDTO';
import { JWTProvider } from '@src/modules/users/providers/JWTProvider/JWTProvider';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';

const instituteRepositoryMock = mock<InstituteRepository>();
const userRepositoryMock = mock<UserRepository>();

const userRepository = new UserRepository();
const instituteRepository = new InstituteRepository();
const jwtProvider = new JWTProvider();
const date = new Date();

describe('Institute functional tests', () => {
  const defaultUser: CreateUserDTO = {
    name: 'Alan',
    email: 'alan@gmail.com',
    password: '123123123',
    balance: 0,
  };
  let token: string;
  beforeEach(async () => {
    await instituteRepository.deleteAll();
    await userRepository.deleteAll();
    await userRepository.create(defaultUser);
    token = jwtProvider.generateToken(defaultUser);
  });
  describe('When craete a new institute', () => {
    it('should return successfully when create a new institute', async () => {
      const newInstitute: Institute = {
        name: 'Escola de Samba',
        CNPJ: 'XX. XXX. XXX/0001-XX',
        id: 10,
        owner: new User(),
        created_at: date,
        updated_at: date,
        events: [],
        ownerId: 1,
      };

      instituteRepositoryMock.create.mockResolvedValue(newInstitute);

      const response = await global.testRequest
        .post('/api/institutes')
        .send({ name: newInstitute.name, CNPJ: newInstitute.CNPJ })
        .set({
          authorization: `Bearer ${token}`,
        });
      // expect(response.status).toEqual(200);
      expect(response.body).toEqual(expect.objectContaining(newInstitute));
    });
  });
});
