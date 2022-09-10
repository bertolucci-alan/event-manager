import { Institute, User } from '@src/database/entity';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { JWTProvider } from '@src/modules/users/providers/JWTProvider/JWTProvider';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';

export const repositoryMock = mock<Repository<any>>();
const instituteRepositoryMock = mock<InstituteRepository>();
const userRepositoryMock = mock<UserRepository>();
const jwtProvider = new JWTProvider();
const date = new Date();

describe('Institute functional tests', () => {
  describe('When craete a new institute', () => {
    it('should return successfully when create a new institute', async () => {
      const newUser: User = {
        id: 1,
        name: 'Alan',
        email: 'alan@gmail.com',
        password: '123123123',
        balance: 0,
        isAdmin: false,
        events: [],
        users_events: [],
        created_at: date,
        updated_at: date,
      };
      userRepositoryMock.create.mockResolvedValue(newUser);

      const user = await userRepositoryMock.create(newUser);
      const token = jwtProvider.generateToken({ id: user.id });

      const newInstitute: Institute = {
        name: 'Escola de Samba',
        CNPJ: 'XX. XXX. XXX/0001-XX',
        id: 0,
        owner: user,
        created_at: date,
        updated_at: date,
      };

      userRepositoryMock.findById.mockResolvedValue(user);
      instituteRepositoryMock.create.mockResolvedValue(newInstitute);

      const response = await global.testRequest
        .post('/api/institutes')
        .send({ name: newUser.name, CNPJ: newInstitute.CNPJ })
        .set({
          authorization: `Bearer ${token}`,
        });
      // expect(response.status).toEqual(200);
      expect(response.body).toEqual(expect.objectContaining(newInstitute));
    });
  });
});
