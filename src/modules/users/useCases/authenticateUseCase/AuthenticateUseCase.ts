import { User } from '@src/database/entity';
import { AppError } from '@src/shared/errors/app-error';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AuthenticateUserDTO } from '../../dtos/AuthenticateUserDTO';
import { IHashProvider } from '../../providers/HashProvider/interfaces/IHashProvider';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<{ user: User; token: string }> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) throw new AppError('User not found', 404);

    const passwordMatch = this.hashProvider.comparePassword(
      password,
      userExists.password
    );
    if (!passwordMatch) throw new AppError('Password does not match', 401);

    const token: string = sign({ id: userExists.id }, 'secret', {
      expiresIn: 3600,
    });

    return {
      user: userExists,
      token,
    };
  }
}
