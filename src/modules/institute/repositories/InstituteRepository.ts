import { dataSource } from '@src/database';
import { Institute, User } from '@src/database/entity';
import { FindOptionsWhere } from 'typeorm';
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

  async findByUser(user: User): Promise<Institute> {
    const institute = await this.repository.findOneBy({
      owner: user.id as FindOptionsWhere<User>,
    });
    return institute as Institute;
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
