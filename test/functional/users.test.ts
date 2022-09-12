import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { CreateUserDTO } from '@src/modules/users/dtos/CreateUserDTO';

export const repositoryMock = mock<Repository<any>>();
const instituteRepository = new InstituteRepository();
const userRepository = new UserRepository();

describe('User functional tests', () => {
  beforeEach(async () => {
    await instituteRepository.deleteAll();
    await userRepository.deleteAll();
  });
  describe('When craete a new user', () => {
    it('should return successfully when create a new user', async () => {
      const newUser: CreateUserDTO = {
        name: 'Alan',
        email: 'alan+5@gmail.com',
        password: '123123123',
        balance: 0,
      };

      const response = await global.testRequest
        .post('/api/users')
        .send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({ ...newUser, password: expect.any(String) })
      );
    });

    it('should return 400 when there is validation error', async () => {
      const newUser: Partial<CreateUserDTO> = {
        email: 'alan@gmail.com',
        password: '123123123',
      };
      const response = await global.testRequest
        .post('/api/users')
        .send(newUser);
      expect(response.status).toBe(400);
    });
  });

  describe('When authenticate user', () => {
    const defaultUser: CreateUserDTO = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
    };

    beforeEach(async () => {
      await userRepository.create(defaultUser);
    });

    it('should generate a token for valid user', async () => {
      const response = await global.testRequest
        .post('/api/auth')
        .send({ email: defaultUser.email, password: defaultUser.password });
      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });

    it('should return 401 when failed authentication', async () => {
      const response = await global.testRequest.post('/api/auth').send({
        email: 'fake-email@gmail.com',
        password: 'fake-password',
      });
      expect(response.status).toBe(401);
      expect(JSON.parse(response.text)).toEqual({
        name: 'Unauthorized',
        status: 401,
        message: 'email/password invalid',
      });
    });
  });
});
