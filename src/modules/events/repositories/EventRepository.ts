import { dataSource } from '@src/database';
import { Event, Institute, User } from '@src/database/entity';
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
}
