import { Body, JsonController, Post } from 'routing-controllers';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(@Body() body: any) {
    return 'teste';
  }
}
