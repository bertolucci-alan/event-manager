import { Event, User } from '@src/database/entity';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  findByEvent(event: Event): Promise<User[]>;
  deleteAll(): Promise<void>;
}
