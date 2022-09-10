import { Event, Institute, User } from '@src/database/entity';
import { CreateEventDTO } from '../../dtos/CreateEventDTO';

export interface IEventRepository {
  create(
    data: CreateEventDTO,
    user: User,
    institute: Institute
  ): Promise<Event>;
}
