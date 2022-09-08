import { User } from '@src/database/entity';
import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { dataSource } from '@src/database';

export const repositoryMock = mock<Repository<any>>();

describe('When create a new user', () => {
  beforeEach(async () => {
    const userRepository = dataSource.getRepository(User);
    await userRepository.delete({});
  });
  it('should return successfully when create a new user', async () => {
    const newUser: Partial<User> = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123',
      balance: 0,
      isAdmin: false,
    };

    repositoryMock.create.mockResolvedValue(newUser);

    const response = await global.testRequest.post('/api/users').send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ ...newUser, password: expect.any(String) })
    );
  });
});
