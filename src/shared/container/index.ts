import 'reflect-metadata';
import '../../util/module-alias';
import { container } from 'tsyringe';

import { UserRepository } from '@modules/users/repositories/UserRepository';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
