// import { dataSource } from '@src/database';
import { dataSource } from '@src/database/index';
import { Event, User } from '@src/database/entity';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository = dataSource.getRepository(User);

  async create(data: DeepPartial<User>): Promise<User> {
    const user = this.repository.create({ ...data, isAdmin: false });
    return await this.repository.save(user);
  }

  async find(): Promise<User[]> {
    const user = await this.repository.find();
    return user as User[];
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'balance', 'isAdmin'],
    });
    return user as User;
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
    });
    return user as User;
  }

  async findByEvent(event: Event): Promise<User[]> {
    const users = await this.repository.find({
      where: {
        users_events: { id: event.id },
      },
    });
    return users;
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
