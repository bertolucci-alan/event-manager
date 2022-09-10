import { dataSource } from '@src/database';
import { Institute, User } from '@src/database/entity';
import { IInstituteRepository } from './interfaces/IInstituteRepository';

export class InstituteRepository implements IInstituteRepository {
  private repository = dataSource.getRepository(Institute);
  async create(data: Partial<Institute>, user: User): Promise<Institute> {
    const institute = this.repository.create({
      ...data,
      owner: user,
    });
    return await this.repository.save(institute);
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
