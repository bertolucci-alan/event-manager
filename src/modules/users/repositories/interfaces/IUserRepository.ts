import { Event, User } from '@src/database/entity';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByEvent(event: Event): Promise<User[]>;
  deleteAll(): Promise<void>;
}
