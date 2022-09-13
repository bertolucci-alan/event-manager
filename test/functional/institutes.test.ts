import { CreateInstituteDTO } from '@src/modules/institute/dtos/CreateInstituteDTO';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { CreateUserDTO } from '@src/modules/users/dtos/CreateUserDTO';
import { JWTProvider } from '@src/modules/users/providers/JWTProvider/JWTProvider';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';

const userRepository = new UserRepository();
const instituteRepository = new InstituteRepository();
const jwtProvider = new JWTProvider();

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
      const newInstitute: CreateInstituteDTO = {
        name: 'Escola de Samba',
        CNPJ: 'XX. XXX. XXX/0001-XX',
      };

      const response = await global.testRequest
        .post('/api/institutes')
        .send({ name: newInstitute.name, CNPJ: newInstitute.CNPJ })
        .set({
          authorization: `Bearer ${token}`,
        });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expect.objectContaining(newInstitute));
    });
  });
});
