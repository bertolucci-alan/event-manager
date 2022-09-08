import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { User } from '@src/database/entity';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);
    return user;
  }
}
