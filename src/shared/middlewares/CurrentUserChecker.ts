import { JWTProvider } from '@src/modules/users/providers/JWTProvider/JWTProvider';
import { Action } from 'routing-controllers';
import { AppError } from '../errors/app-error';
import { Session } from '../interfaces/Session';
import { Token } from '../interfaces/Token';

export function currentUserChecker(action: Action): Session {
  const header = action.request.headers.authorization;
  if (!header) throw new AppError('Token not present', 401);

  const [, token] = header.split(' ');
  if (!token) throw new AppError('Token not present', 401);

  try {
    const user = new JWTProvider().decodedToken(token) as Token;
    return user;
  } catch (err) {
    throw new AppError('Token invalid', 401);
  }
}
