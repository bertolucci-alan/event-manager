import { mock } from 'jest-mock-extended';
import { JWTProvider } from './JWTProvider';
import { Token } from '@src/shared/interfaces/Token';

const JWTProviderMock = mock<JWTProvider>();

describe('JWTProvider unit test', () => {
  it('should return a token', async () => {
    JWTProviderMock.generateToken.mockReturnValue('fake-token' as never);
    const token = JWTProviderMock.generateToken({});
    expect(token).toEqual('fake-token');
  });

  it('should return a object decoded token', async () => {
    JWTProviderMock.decodedToken.mockReturnValue({ id: 0 });
    const decoded: Token = JWTProviderMock.decodedToken('fake-token');
    expect(decoded).toEqual({ id: 0 });
  });
});
