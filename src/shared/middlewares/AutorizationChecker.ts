import { Action } from 'routing-controllers';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/app-error';
import { Token } from '../interfaces/Token';

export function autorizationChecker(action: Action): boolean {
  const header = action.request.headers.authorization;
  if (!header) throw new AppError('Token not present', 401);

  const [, token] = header.split(' ');
  if (!token) throw new AppError('Token not present', 401);

  try {
    verify(token, 'secret') as Token;
    return true;
  } catch (err) {
    throw new AppError('Token invalid', 401);
  }
}
