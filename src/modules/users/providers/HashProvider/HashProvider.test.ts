import { mock } from 'jest-mock-extended';
import { HashProvider } from './HashProvider';

const hashProviderMock = mock<HashProvider>();

describe('HashProvider unit test', () => {
  it('should return a hashed password', async () => {
    hashProviderMock.hashPassword.mockResolvedValue('fake-hash');
    const hash = await new HashProvider().hashPassword('fake-password', 8);
    expect(hash).toEqual(expect.any(String));
  });

  it('should return true compare password', async () => {
    const hashFakePassword =
      '$2b$08$6hcrDwFbPer/3CEpk42M3ecTBuqcUcyKQ.2siRVUoE3kGKkXMWpJO';

    hashProviderMock.comparePassword.mockResolvedValue(true);

    const compareHash = await new HashProvider().comparePassword(
      'fake-password',
      hashFakePassword
    );
    expect(compareHash).toBeTruthy();
  });
});
