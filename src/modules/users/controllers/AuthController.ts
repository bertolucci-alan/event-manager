import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { AuthenticateUseCase } from '../useCases/authenticateUseCase/AuthenticateUseCase';

@JsonController('/auth')
export class AuthController {
  @Post('')
  async auth(@Body() body: AuthenticateUserDTO) {
    try {
      const authCase = container.resolve(AuthenticateUseCase);
      return await authCase.execute(body);
    } catch (err) {
      console.log(`Error during authenticate: ${err}`);
    }
  }
}
