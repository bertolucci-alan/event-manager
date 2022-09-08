// import { dataSource } from '@src/database';
import { dataSource } from '@src/database/index';
import { User } from '@src/database/entity';
import { DeepPartial, Repository } from 'typeorm';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository = dataSource.getRepository(User);

  async create(data: DeepPartial<User>): Promise<User> {
    const user = this.repository.create({ ...data, isAdmin: false });
    return await this.repository.save(user);
  }
}
