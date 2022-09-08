import 'reflect-metadata';
import './util/module-alias';
import '@src/database/index';
import '@src/shared/container';

import { SetupServer } from './app';

(async (): Promise<void> => {
  try {
    const server = new SetupServer();
    server.start();
  } catch (err) {
    console.log(`App exited with error: ${err}`);
  }
})();
