import { container } from 'tsyringe';
import { CacheService } from './CacheService';
import { ICacheService } from './interfaces/ICacheService';

container.registerSingleton<ICacheService>('CacheService', CacheService);
