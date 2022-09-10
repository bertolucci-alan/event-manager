import { dataSource } from '@src/database';
import { Institute, User } from '@src/database/entity';
import { AppError } from '@src/shared/errors/app-error';
import { IInstituteRepository } from './interfaces/IInstituteRepository';

export class InstituteRepository implements IInstituteRepository {
  private instituteRepository = dataSource.getRepository(Institute);
  async create(data: Partial<Institute>, user: User): Promise<Institute> {
    try {
      const institute = this.instituteRepository.create({
        ...data,
        owner: user,
      });
      return await this.instituteRepository.save(institute);
    } catch (err) {
      console.log('teste');
      throw new AppError(`erro aqui ${err}`);
    }
  }
}
