import { User } from '@src/database/entity';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AuthenticateUserDTO } from '../../dtos/AuthenticateUserDTO';
import { IHashProvider } from '../../providers/HashProvider/interfaces/IHashProvider';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

export interface ResponseAuthenticateUser {
  user?: User;
  token?: string;
  error?: string;
  description?: string;
  code?: number;
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<ResponseAuthenticateUser> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists)
      return {
        error: 'Failed Authentication',
        description: 'email/password invalid',
        code: 401,
      };

    const passwordMatch = await this.hashProvider.comparePassword(
      password,
      userExists.password
    );
    if (!passwordMatch)
      return {
        error: 'Failed Authentication',
        description: 'email/password invalid',
        code: 401,
      };

    const token: string = sign({ id: userExists.id }, 'secret', {
      expiresIn: 3600,
    });

    return {
      user: userExists,
      token,
      code: 200,
    };
  }
}
