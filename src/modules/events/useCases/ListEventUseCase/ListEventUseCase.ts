import { Event } from '@src/database/entity';
import { inject, injectable } from 'tsyringe';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';
import config from 'config';
import { ICacheService } from '@src/util/cache/interfaces/ICacheService';
@injectable()
export class ListEventUseCase {
  constructor(
    @inject('CacheService') private cacheService: ICacheService,
    @inject('EventRepository') private eventRepository: IEventRepository
  ) {}

  async execute(psd: boolean): Promise<Event[]> {
    const cachedEvents = await this.cacheService.getCache<Event[]>(
      config.get('App.cache.keys.getEvents')
    );
    if (cachedEvents) {
      if (!psd)
        return cachedEvents.filter(
          (cacheEvent) => new Date(cacheEvent.end_date) > new Date()
        );
      return cachedEvents;
    }

    const events: Event[] = await this.eventRepository.list(psd, {
      relations: ['owner', 'institute'],
    });

    await this.cacheService.setCache(
      config.get('App.cache.keys.getEvents'),
      events
    );

    return events;
  }
}
