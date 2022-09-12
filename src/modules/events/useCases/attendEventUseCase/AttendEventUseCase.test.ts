import { Event, Institute, User } from '@src/database/entity';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';
import { EventRepository } from '../../repositories/EventRepository';
import { AttendEventUseCase } from '@src/modules/events/useCases/attendEventUseCase/AttendEventUseCase';

const userRepository = mock<UserRepository>();
const eventRepository = mock<EventRepository>();
const date = new Date();

describe('AttendEventUseCase unit test', () => {
  it('should return successfully when user will participate in the event', async () => {
    const user: User = {
      id: 55,
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 10,
      isAdmin: false,
      created_at: date,
      updated_at: date,
      events: [],
      users_events: [],
      institutes: [],
    };

    const event: Event = {
      id: 6,
      name: 'Festa',
      description: 'Festinha',
      rating: 'FREE',
      price: 10,
      start_date: date,
      end_date: date,
      ownerId: 1,
      created_at: date,
      updated_at: date,
      institute: new Institute(),
      owner: user,
      users: [user],
    };

    userRepository.findById.mockResolvedValue(user);
    eventRepository.findById.mockResolvedValue(event);
    eventRepository.update.mockResolvedValue(event);

    const attendEvent = new AttendEventUseCase(eventRepository, userRepository);

    const response = await attendEvent.execute(event.id, user.id);
    expect(response).toEqual(event);
  });

  it('should return 404 when event not found', async () => {
    const user: User = {
      id: 55,
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 10,
      isAdmin: false,
      created_at: date,
      updated_at: date,
      events: [],
      users_events: [],
      institutes: [],
    };
    userRepository.findById.mockResolvedValue(user);
    eventRepository.findById.mockResolvedValue(null);

    const attendEvent = new AttendEventUseCase(eventRepository, userRepository);

    await expect(attendEvent.execute(0, user.id)).rejects.toEqual({
      message: 'Event not found',
      statusCode: 404,
    });
  });

  it('should return insufficient balance when user balance < event price', async () => {
    const user: User = {
      id: 55,
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123123123',
      balance: 0,
      isAdmin: false,
      created_at: date,
      updated_at: date,
      events: [],
      users_events: [],
      institutes: [],
    };

    const event: Event = {
      id: 6,
      name: 'Festa',
      description: 'Festinha',
      rating: 'FREE',
      price: 10,
      start_date: date,
      end_date: date,
      ownerId: 1,
      created_at: date,
      updated_at: date,
      institute: new Institute(),
      owner: user,
      users: [user],
    };

    userRepository.findById.mockResolvedValue(user);
    eventRepository.findById.mockResolvedValue(event);

    const attendEvent = new AttendEventUseCase(eventRepository, userRepository);

    await expect(attendEvent.execute(event.id, user.id)).rejects.toEqual({
      message: 'Insufficient balance',
      statusCode: 400,
    });
  });
});
