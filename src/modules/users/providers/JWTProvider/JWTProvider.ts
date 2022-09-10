import { User } from '@src/database/entity';
import { IJWTProvider } from './interfaces/IJWTProvider';
import jwt from 'jsonwebtoken';

export class JWTProvider implements IJWTProvider {
  generateToken(payload: object): string {
    return jwt.sign(payload, 'secret', {
      expiresIn: 3600,
    });
  }

  decodedToken(token: string): User {
    return jwt.verify(token, 'secret') as User;
  }
}
