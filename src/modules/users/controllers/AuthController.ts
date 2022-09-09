import { AppError } from '@src/shared/errors/app-error';
import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import {
  AuthenticateUseCase,
  ResponseAuthenticateUser,
} from '../useCases/authenticateUseCase/AuthenticateUseCase';

@JsonController('/auth')
export class AuthController {
  @Post('')
  async auth(
    @Body() body: AuthenticateUserDTO
  ): Promise<ResponseAuthenticateUser> {
    const authCase = container.resolve(AuthenticateUseCase);
    return await authCase.execute(body);
  }
}
