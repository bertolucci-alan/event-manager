import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { AuthenticateUseCase } from './AuthenticateUseCase';

export const repositoryMock = mock<Repository<any>>();

describe('Authenticate Case unit test', () => {
  it('should return successfully when user authenticate', async () => {
    const user = {
      email: 'alan@gmail.com',
      password: '123123123',
    };

    repositoryMock.findOne.mockResolvedValue(user);
    const authCase = new AuthenticateUseCase(repositoryMock);
    const response = await authCase.execute(user);
    expect(response).toEqual('token');
  });
});
