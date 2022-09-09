import { IHashProvider } from './interfaces/IHashProvider';
import bcrypt from 'bcrypt';

export class HashProvider implements IHashProvider {
  public async hashPassword(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
  public async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
