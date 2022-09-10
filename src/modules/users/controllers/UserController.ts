import { Body, Get, JsonController, Post } from 'routing-controllers';
import { CreateUserUseCase } from '../useCases/createUserUseCase/CreateUserUseCase';
import { container } from 'tsyringe';
import { User } from '@src/database/entity';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { AppError } from '@src/shared/errors/app-error';
import { ListUserUseCase } from '../useCases/listUserUseCase/ListUserUseCase';

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

  @Get('/')
  async get(): Promise<User[]> {
    const listUser = container.resolve(ListUserUseCase);
    return await listUser.execute();
  }
}
