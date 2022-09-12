import { Event } from '@src/database/entity';
import { inject, injectable } from 'tsyringe';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

@injectable()
export class ListEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository
  ) {}

  async execute(psd: boolean): Promise<Event[]> {
    const events: Event[] = await this.eventRepository.list(psd);
    return events;
  }
}
