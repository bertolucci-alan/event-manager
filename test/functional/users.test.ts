import { User } from '@src/database/entity';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { dataSource } from '@src/database';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';

export const repositoryMock = mock<Repository<any>>();
const userRepository = new UserRepository();

describe('User functional tests', () => {
  beforeEach(async () => {
    const userRepository = dataSource.getRepository(User);
    await userRepository.delete({});
  });
  describe('When create a new user', () => {
    it('should return successfully when create a new user', async () => {
      const newUser: Partial<User> = {
        name: 'Alan',
        email: 'alan@gmail.com',
        password: '123123123',
        balance: 0,
        isAdmin: false,
      };

      repositoryMock.create.mockResolvedValue(newUser);

      const response = await global.testRequest
        .post('/api/users')
        .send(newUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({ ...newUser, password: expect.any(String) })
      );
    });
  });
  describe('When authenticate user', () => {
    it('should generate a token for a valida user', async () => {
      const newUser: Partial<User> = {
        name: 'Alan',
        email: 'alan@gmail.com',
        password: '123123123',
        balance: 0,
        isAdmin: false,
      };

      await userRepository.create(newUser);

      const response = await global.testRequest
        .post('/api/auth')
        .send({ email: newUser.email, password: newUser.password });
      expect(response.body).toEqual(
        expect.objectContaining({ token: expect.any(String) })
      );
    });
  });
});
