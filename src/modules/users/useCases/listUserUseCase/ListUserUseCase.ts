import { User } from '@src/database/entity';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

@injectable()
export class ListUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
