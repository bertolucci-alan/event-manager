import { container } from 'tsyringe';
import { JWTProvider } from '../JWTProvider';
import { IJWTProvider } from './IJWTProvider';

container.registerSingleton<IJWTProvider>('JWTProvider', JWTProvider);
