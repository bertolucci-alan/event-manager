import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  async create(data: any): Promise<any> {
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
