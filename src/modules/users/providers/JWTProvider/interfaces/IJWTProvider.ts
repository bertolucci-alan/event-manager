import { Token } from '@src/shared/interfaces/Token';

export interface IJWTProvider {
  generateToken(payload: object): string;
  decodedToken(token: string): Token;
}
