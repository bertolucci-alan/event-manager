import { Event } from '@src/database/entity';
import { Session } from '@src/shared/interfaces/Session';
import {
  Authorized,
  Body,
  CurrentUser,
  JsonController,
  Post,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { CreateEventUseCase } from '../useCases/createEventUseCase/CreateEventUseCase';

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
}
