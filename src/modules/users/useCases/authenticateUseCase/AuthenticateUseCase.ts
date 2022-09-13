import { User } from '@src/database/entity';
import { AppError } from '@src/shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { AuthenticateUserDTO } from '../../dtos/AuthenticateUserDTO';
import { IHashProvider } from '../../providers/HashProvider/interfaces/IHashProvider';
import { IJWTProvider } from '../../providers/JWTProvider/interfaces/IJWTProvider';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

export interface ResponseAuthenticateUser {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('JWTProvider') private jwtProvider: IJWTProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<ResponseAuthenticateUser> {
    const userExists = await this.userRepository.findByEmail(email);
    if (!userExists) throw new AppError('email/password invalid', 401);

    const passwordMatch = await this.hashProvider.comparePassword(
      password,
      userExists.password
    );
    if (!passwordMatch) throw new AppError('email/password invalid', 401);
    const token: string = this.jwtProvider.generateToken({ id: userExists.id });

    return {
      user: userExists,
      token,
    };
  }
}
