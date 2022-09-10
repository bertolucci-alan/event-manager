import { User } from '@src/database/entity';

export interface IJWTProvider {
  generateToken(payload: object): string;
  decodedToken(token: string): User;
}
