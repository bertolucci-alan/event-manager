// import { dataSource } from '@src/database';
import { dataSource } from '@src/database/index';
import { User } from '@src/database/entity';
import { DeepPartial } from 'typeorm';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository = dataSource.getRepository(User);

  async create(data: DeepPartial<User>): Promise<User> {
    const user = this.repository.create({ ...data, isAdmin: false });
    return await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      select: ['name', 'email', 'password', 'balance', 'isAdmin'],
    });
    return user as User;
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });
    return user as User;
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
