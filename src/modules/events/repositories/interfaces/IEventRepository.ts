import { Event, Institute, User } from '@src/database/entity';
import { DeepPartial, FindOneOptions } from 'typeorm';
import { CreateEventDTO } from '../../dtos/CreateEventDTO';

export interface IEventRepository {
  create(
    data: CreateEventDTO,
    user: User,
    institute: Institute
  ): Promise<Event>;
  update(id: number, data: DeepPartial<Event>): Promise<Event>;
  findById(id: number, options?: FindOneOptions<Event>): Promise<Event | null>;
  checksIfTheEventBelongsToUser(event: Event, user: User): Promise<boolean>;
}
