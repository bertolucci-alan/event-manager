import { Event } from '@src/database/entity';
import { IInstituteRepository } from '@src/modules/institute/repositories/interfaces/IInstituteRepository';
import { IUserRepository } from '@src/modules/users/repositories/interfaces/IUserRepository';
import { AppError } from '@src/shared/errors/app-error';
import { ICacheService } from '@src/util/cache/interfaces/ICacheService';
import config from 'config';
import { inject, injectable } from 'tsyringe';
import { CreateEventDTO } from '../../dtos/CreateEventDTO';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject('CacheService') private cacheService: ICacheService,
    @inject('InstituteRepository')
    private instituteRepository: IInstituteRepository,
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: CreateEventDTO, authId: number): Promise<Event> {
    const userExists = await this.userRepository.findById(authId);
    if (!userExists) throw new AppError('User not found', 404);

    const instituteByUser = await this.instituteRepository.findByUser(
      userExists
    );
    if (!instituteByUser) throw new AppError('No registered institutes', 404);

    const event = await this.eventRepository.create(
      data,
      userExists,
      instituteByUser
    );
    const eventWithUsers = await this.eventRepository.findById(event.id, {
      relations: ['users'],
    });
    if (!eventWithUsers) throw new AppError('Users not found', 404);

    const eventAttend = await this.eventRepository.update(event.id, {
      ...eventWithUsers,
      users: [...eventWithUsers.users, userExists],
    });

    const cachedEvents = await this.cacheService.getCache<Event[]>(
      config.get('App.cache.keys.getEvents')
    );
    if (cachedEvents) {
      cachedEvents?.push({
        ...event,
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
      });
      await this.cacheService.setCache<Event[]>(
        config.get('App.cache.keys.getEvents'),
        cachedEvents
      );
    }

    return eventAttend;
  }
}
