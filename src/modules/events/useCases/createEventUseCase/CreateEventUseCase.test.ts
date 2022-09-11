import { Event, Institute, User } from '@src/database/entity';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { UserRepository } from '@src/modules/users/repositories/UserRepository';
import { mock } from 'jest-mock-extended';
import { EventRepository } from '../../repositories/EventRepository';
import { CreateEventUseCase } from './CreateEventUseCase';

const userRepository = mock<UserRepository>();
const instituteRepository = mock<InstituteRepository>();
const eventRepository = mock<EventRepository>();
const date = new Date();

describe('CreateEventUseCase unit test', () => {
  it('should be able to create an event', async () => {
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

    const institute: Institute = {
      id: 30,
      name: 'Escola de Samba',
      CNPJ: 'XX. XXX. XXX/0001-XX',
      owner: user,
      created_at: date,
      updated_at: date,
      events: [],
      ownerId: 0,
    };

    const newEvent: Event = {
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
      institute: institute,
      owner: user,
      users: [user],
    };

    userRepository.findById.mockResolvedValue(user);
    instituteRepository.findByUser.mockResolvedValue(institute);
    eventRepository.create.mockResolvedValue(newEvent);
    eventRepository.findById.mockResolvedValue(newEvent);
    eventRepository.update.mockResolvedValue(newEvent);

    const createEvent = new CreateEventUseCase(
      instituteRepository,
      eventRepository,
      userRepository
    );

    const response = await createEvent.execute(
      {
        name: newEvent.name,
        description: newEvent.description,
        rating: newEvent.rating,
        price: newEvent.price,
        start_date: newEvent.start_date.toString(),
        end_date: newEvent.end_date.toString(),
      },
      user.id
    );

    expect(response).toEqual(newEvent);
  });

  it('should return 404 when there are no registered institutes', async () => {
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

    userRepository.findById.mockResolvedValue(user);
    instituteRepository.findByUser.mockResolvedValue(null);

    const createEvent = new CreateEventUseCase(
      instituteRepository,
      eventRepository,
      userRepository
    );

    await expect(
      createEvent.execute(
        {
          name: 'fake-name',
          description: 'fake-description',
          rating: 'FREE',
          price: 0,
          start_date: date.toString(),
          end_date: date.toString(),
        },
        1
      )
    ).rejects.toEqual({
      message: 'No registered institutes',
      statusCode: 404,
    });
  });
});
