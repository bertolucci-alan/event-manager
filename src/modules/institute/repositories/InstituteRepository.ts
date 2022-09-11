import { dataSource } from '@src/database';
import { Institute, User } from '@src/database/entity';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';
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

  async findByUser(user: User): Promise<Institute | null> {
    const institute = await this.repository.findOne({
      where: { ownerId: user.id },
    });
    return institute;
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
