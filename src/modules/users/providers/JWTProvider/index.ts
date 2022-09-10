import { container } from 'tsyringe';
import { JWTProvider } from './JWTProvider';
import { IJWTProvider } from './interfaces/IJWTProvider';

container.registerSingleton<IJWTProvider>('JWTProvider', JWTProvider);
