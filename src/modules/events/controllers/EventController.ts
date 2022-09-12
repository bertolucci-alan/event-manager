import { Event } from '@src/database/entity';
import { Session } from '@src/shared/interfaces/Session';
import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { AttendEventUseCase } from '../useCases/attendEventUseCase/AttendEventUseCase';
import { CreateEventUseCase } from '../useCases/createEventUseCase/CreateEventUseCase';
import { ListEventUseCase } from '../useCases/ListEventUseCase/listEventUseCase';

@JsonController('/events')
export class EventController {
  @Authorized()
  @Post('/')
  async create(
    @Body() body: CreateEventDTO,
    @CurrentUser() { id }: Session
  ): Promise<Event> {
    const createEvent = container.resolve(CreateEventUseCase);
    return await createEvent.execute(body, id);
  }

  @Authorized()
  @Post('/attend/:eventId')
  async attend(
    @Param('eventId') eventId: number,
    @CurrentUser() { id }: Session
  ): Promise<Event> {
    const attendEvent = container.resolve(AttendEventUseCase);
    return await attendEvent.execute(eventId, id);
  }

  @Authorized()
  @Get('/')
  async get(@QueryParam('psd') psd: boolean): Promise<Event[]> {
    const listEvents = container.resolve(ListEventUseCase);
    return await listEvents.execute(psd);
  }
}
