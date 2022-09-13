import 'reflect-metadata';
import '../../util/module-alias';
import { container } from 'tsyringe';

import '@src/modules/users/providers/HashProvider';
import '@src/modules/users/providers/JWTProvider';
import '@src/util/cache';

import { UserRepository } from '@modules/users/repositories/UserRepository';
import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IInstituteRepository } from '@src/modules/institute/repositories/interfaces/IInstituteRepository';
import { InstituteRepository } from '@src/modules/institute/repositories/InstituteRepository';
import { IEventRepository } from '@src/modules/events/repositories/interfaces/IEventRepository';
import { EventRepository } from '@src/modules/events/repositories/EventRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IInstituteRepository>(
  'InstituteRepository',
  InstituteRepository
);

container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository
);
