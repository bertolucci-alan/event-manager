import { container } from 'tsyringe';
import { HashProvider } from './HashProvider';
import { IHashProvider } from './interfaces/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
