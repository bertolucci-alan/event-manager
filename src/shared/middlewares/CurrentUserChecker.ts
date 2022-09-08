import { decode } from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { AppError } from '../errors/app-error';
import { Session } from '../interfaces/Session';
import { Token } from '../interfaces/Token';

export function currenteUserChecker(action: Action): Session {
  const header = action.request.headers.authorization;
  if (!header) throw new AppError('Token not present', 401);

  const [, token] = header.split(' ');
  if (!token) throw new AppError('Token not present', 401);

  try {
    const user = decode(token) as Token;
    return user;
  } catch (err) {
    throw new AppError('Token invalid', 401);
  }
}
