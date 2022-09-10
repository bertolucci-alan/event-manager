import { Institute, User } from '@src/database/entity';

export interface IInstituteRepository {
  create(data: Partial<Institute>, user: User): Promise<Institute>;
}
