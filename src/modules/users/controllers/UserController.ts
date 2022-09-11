import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { CreateUserUseCase } from '../useCases/createUserUseCase/CreateUserUseCase';
import { container } from 'tsyringe';
import { User } from '@src/database/entity';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AppError } from '@src/shared/errors/app-error';
import { ListUserByEventUseCase } from '../useCases/listUserByEventUseCase/ListUserByEventUseCase';
import { Session } from '@src/shared/interfaces/Session';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(@Body() body: CreateUserDTO): Promise<User> {
    try {
      const createUser: CreateUserUseCase =
        container.resolve(CreateUserUseCase);
      return await createUser.execute(body);
    } catch (err) {
      throw new AppError(`Error during user creation: ${err}`);
    }
  }

  @Authorized()
  @Get('/:eventId')
  async getUsersByEvent(
    @Param('eventId') eventId: number,
    @CurrentUser() { id }: Session
  ): Promise<User[]> {
    const listUserByEvent = container.resolve(ListUserByEventUseCase);
    return await listUserByEvent.execute(id, eventId);
  }
}
