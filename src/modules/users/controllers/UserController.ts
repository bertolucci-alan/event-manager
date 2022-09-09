import { Body, JsonController, Post } from 'routing-controllers';
import { CreateUserUseCase } from '../useCases/createUserUseCase/CreateUserUseCase';
import { container } from 'tsyringe';
import { User } from '@src/database/entity';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(@Body() body: CreateUserDTO): Promise<User> {
    try {
      const createUser: CreateUserUseCase =
        container.resolve(CreateUserUseCase);
      return await createUser.execute(body);
    } catch (err) {
      console.log(`Error create user: ${err}`);
      throw new Error(`err: ${err}`);
    }
  }
}
