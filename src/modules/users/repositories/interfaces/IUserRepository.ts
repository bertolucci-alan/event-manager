import { Event, User } from '@src/database/entity';
import { DeepPartial } from 'typeorm';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  update(id: number, data: DeepPartial<User>): Promise<User>;
  find(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByEvent(event: Event): Promise<User[]>;
  deleteAll(): Promise<void>;
}
