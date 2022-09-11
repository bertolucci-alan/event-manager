import { Event, User } from '@src/database/entity';
import { IEventRepository } from '@src/modules/events/repositories/interfaces/IEventRepository';
import { IInstituteRepository } from '@src/modules/institute/repositories/interfaces/IInstituteRepository';
import { AppError } from '@src/shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

@injectable()
export class ListUserByEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('InstituteRepository')
    private instituteRepository: IInstituteRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(authId: number, eventId: number): Promise<User[]> {
    const user: User = await this.userRepository.findById(authId);
    if (!user) throw new AppError('User not found', 404);

    const event: Event = await this.eventRepository.findById(eventId);
    if (!event) throw new AppError('Event not found', 404);

    const eventBelongsToUser =
      await this.eventRepository.checksIfTheEventBelongsToUser(event, user);
    if (!eventBelongsToUser) throw new AppError('Unauthorized', 401);

    const users = await this.userRepository.findByEvent(event);

    return users;
  }
}
