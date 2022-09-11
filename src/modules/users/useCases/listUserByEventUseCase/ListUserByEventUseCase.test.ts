import { Event, Institute, User } from '@src/database/entity';
import { EventRepository } from '@src/modules/events/repositories/EventRepository';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { mock } from 'jest-mock-extended';
import { UserRepository } from '../../repositories/UserRepository';
import { ListUserByEventUseCase } from './ListUserByEventUseCase';

const userRepositoryMock = mock<UserRepository>();
const instituteRepositoryMock = mock<InstituteRepository>();
const eventRepository = mock<EventRepository>();
const date = new Date();

describe('List User By Event unit test', () => {
  it('should return a list of users who will participate in the event', async () => {
    const user: User = {
      id: 1,
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
    userRepositoryMock.findById.mockResolvedValue(user);

    const event: Event = {
      id: 6,
      name: 'Festa',
      description: 'Festinha',
      rating: 'FREE',
      price: 10,
      start_date: date,
      end_date: date,
      ownerId: user.id,
      owner: user,
      institute: new Institute(),
      created_at: date,
      updated_at: date,
      users: [],
    };
    eventRepository.findById.mockResolvedValue(event);
    eventRepository.checksIfTheEventBelongsToUser.mockResolvedValue(true);

    userRepositoryMock.findByEvent.mockResolvedValue([user]);

    const listEvent = new ListUserByEventUseCase(
      eventRepository,
      instituteRepositoryMock,
      userRepositoryMock
    );

    const response = await listEvent.execute(1, 6);
    expect(response).toEqual([user]);
  });

  it('should return unauthorized when user is not event owner', async () => {
    const user: User = {
      id: 1,
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
    userRepositoryMock.findById.mockResolvedValue(user);

    const event: Event = {
      id: 6,
      name: 'Festa',
      description: 'Festinha',
      rating: 'FREE',
      price: 10,
      start_date: date,
      end_date: date,
      ownerId: user.id,
      owner: user,
      institute: new Institute(),
      created_at: date,
      updated_at: date,
      users: [],
    };
    eventRepository.findById.mockResolvedValue(event);
    eventRepository.checksIfTheEventBelongsToUser.mockResolvedValue(false);

    const listEvent = new ListUserByEventUseCase(
      eventRepository,
      instituteRepositoryMock,
      userRepositoryMock
    );
    await expect(listEvent.execute(1, 6)).rejects.toEqual({
      message: 'Unauthorized',
      statusCode: 401,
    });
  });
});
