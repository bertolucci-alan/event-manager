import { Event } from '@src/database/entity';
import { inject, injectable } from 'tsyringe';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';
import CacheService from '@src/util/cache';
import config from 'config';
@injectable()
export class ListEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository
  ) {}

  async execute(psd: boolean): Promise<Event[]> {
    const cachedEvents = await CacheService.getCache<Event[]>(
      config.get('App.cache.keys.getEvents')
    );
    if (cachedEvents) return cachedEvents;

    const events: Event[] = await this.eventRepository.list(psd);

    await CacheService.setCache(config.get('App.cache.keys.getEvents'), events);

    return events;
  }
}
