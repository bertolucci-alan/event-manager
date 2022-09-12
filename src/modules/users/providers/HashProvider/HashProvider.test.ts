import { mock } from 'jest-mock-extended';
import { HashProvider } from './HashProvider';

const hashProviderMock = mock<HashProvider>();

describe('HashProvider unit test', () => {
  it('should return a hashed password', async () => {
    hashProviderMock.hashPassword.mockResolvedValue('fake-hash');
    const hash = await hashProviderMock.hashPassword('fake-password', 8);
    expect(hash).toEqual('fake-hash');
  });

  it('should return true compare password', async () => {
    hashProviderMock.comparePassword.mockResolvedValue(true);

    const compareHash = await hashProviderMock.comparePassword(
      'fake-password',
      'fake-password-hashed'
    );
    expect(compareHash).toBeTruthy();
  });
});
