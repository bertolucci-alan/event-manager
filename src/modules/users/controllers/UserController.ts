import { Body, JsonController, Post } from 'routing-controllers';
import { CreateUserUseCase } from '../useCases/createUserUseCase/CreateUserUseCase';
import { container } from 'tsyringe';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(@Body() body: any): Promise<any> {
    try {
      const createUser: CreateUserUseCase =
        container.resolve(CreateUserUseCase);
      return await createUser.execute(body);
    } catch (err) {
      console.log(`Error create user: ${err}`);
    }
  }
}
