import { Institute, User } from '@src/database/entity';
import { CacheService } from '@src/util/cache/CacheService';
import { mock } from 'jest-mock-extended';
import { EventRepository } from '../../repositories/EventRepository';
import { ListEventUseCase } from './ListEventUseCase';

const eventRepositoryMock = mock<EventRepository>();
const cachedServiceMock = mock<CacheService>();
const date = new Date();

describe('ListEventUseCase unit test', () => {
  it('should return events that have not yet passed', async () => {
    date.setTime(date.getTime() - 3 * 60 * 60 * 1000);
    const newEvents = [
      {
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
        owner: new User(),
        users: [new User()],
      },
      {
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
        owner: new User(),
        users: [new User()],
      },
    ];
    cachedServiceMock.getCache.mockResolvedValue(null);
    cachedServiceMock.setCache.mockResolvedValue(null);

    eventRepositoryMock.list.mockResolvedValue(newEvents);
    const listEvents = new ListEventUseCase(
      cachedServiceMock,
      eventRepositoryMock
    );
    const response = await listEvents.execute(false);
    expect(response).toEqual(newEvents);
  });

  it('should return events that have already passed', async () => {
    date.setTime(date.getTime() + 3 * 60 * 60 * 1000);
    const newEvents = [
      {
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
        owner: new User(),
        users: [new User()],
      },
      {
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
        owner: new User(),
        users: [new User()],
      },
    ];

    eventRepositoryMock.list.mockResolvedValue(newEvents);
    cachedServiceMock.getCache.mockResolvedValue(null);
    cachedServiceMock.setCache.mockResolvedValue(null);

    const listEvents = new ListEventUseCase(
      cachedServiceMock,
      eventRepositoryMock
    );
    const response = await listEvents.execute(false);
    expect(response).toEqual(newEvents);
  });
});
