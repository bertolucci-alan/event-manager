import { Body, JsonController, Post } from 'routing-controllers';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(@Body() body: any): Promise<any> {
    const newUser = {
      name: 'Alan',
      email: 'alan@gmail.com',
      password: '123',
      balance: 0,
      isAdmin: false,
    };

    return newUser;
  }
}
