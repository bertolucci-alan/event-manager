import { Event } from '@src/database/entity';
import { IUserRepository } from '@src/modules/users/repositories/interfaces/IUserRepository';
import { AppError } from '@src/shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

@injectable()
export class AttendEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(eventId: number, authId: number): Promise<Event> {
    const userExists = await this.userRepository.findById(authId);
    if (!userExists) throw new AppError('User not found', 404);

    const eventExists = await this.eventRepository.findById(eventId, {
      relations: ['users'],
    });
    if (!eventExists) throw new AppError('Event not found', 404);

    const event = await this.eventRepository.update(eventId, {
      ...eventExists,
      users: [...eventExists.users, userExists],
    });

    return event;
  }
}
