import { IJWTProvider } from './interfaces/IJWTProvider';
import jwt from 'jsonwebtoken';
import { Token } from '@src/shared/interfaces/Token';

export class JWTProvider implements IJWTProvider {
  generateToken(payload: object): string {
    return jwt.sign(payload, 'secret', {
      expiresIn: 3600,
    });
  }

  decodedToken(token: string): Token {
    return jwt.decode(token) as any as Token;
  }
}
