import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<any>;
}
