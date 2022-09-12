import { dataSource } from '@src/database';
import { Event, Institute, User } from '@src/database/entity';
import { DeepPartial, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { IEventRepository } from './interfaces/IEventRepository';

export class EventRepository implements IEventRepository {
  private repository = dataSource.getRepository(Event);

  async create(
    data: CreateEventDTO,
    user: User,
    institute: Institute
  ): Promise<Event> {
    const event = this.repository.create({
      ...data,
      owner: user,
      institute: institute,
    });
    return await this.repository.save(event);
  }

  async update(id: number, data: DeepPartial<Event>): Promise<Event> {
    const event = await this.repository.save({ id, ...data });
    return event;
  }

  async findById(
    id: number,
    options?: FindOneOptions<Event>
  ): Promise<Event | null> {
    const event = await this.repository.findOne({ where: { id }, ...options });
    return event;
  }

  async checksIfTheEventBelongsToUser(
    event: Event,
    user: User
  ): Promise<boolean> {
    const eventUser = await this.repository.findOne({
      where: { ownerId: user.id },
    });
    return eventUser ? true : false;
  }
}
