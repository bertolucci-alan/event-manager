import { IUserRepository } from '@src/modules/users/repositories/interfaces/IUserRepository';
import { AppError } from '@src/shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { CreateInstituteDTO } from '../../dtos/CreateInstituteDTO';
import { IInstituteRepository } from '../../repositories/interfaces/IInstituteRepository';

@injectable()
export class CreateInstituteUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('InstituteRepository')
    private instituteRepository: IInstituteRepository
  ) {}

  async execute(data: CreateInstituteDTO, authId: number) {
    const user = await this.userRepository.findById(authId);
    console.log(user);
    if (!user) throw new AppError('User not found', 404);

    const institute = await this.instituteRepository.create(data, user);
    return institute;
  }
}
