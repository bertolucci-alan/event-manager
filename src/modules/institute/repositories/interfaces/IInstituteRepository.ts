import { Institute, User } from '@src/database/entity';

export interface IInstituteRepository {
  create(data: Partial<Institute>, user: User): Promise<Institute>;
  findByUser(user: User): Promise<Institute | null>;
  deleteAll(): Promise<void>;
}
