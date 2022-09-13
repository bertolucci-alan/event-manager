import 'reflect-metadata';
import './util/module-alias';
import '@src/database/index';
import '@src/shared/container';

import { SetupServer } from './app';
import { dataSource } from '@src/database/index';
import logger from './util/logger';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  logger.info(
    `App exiting due an unhadle promise: ${promise} and reason: ${reason}`
  );
  throw reason;
});

process.on('uncaughtException', (err) => {
  logger.info(`App exting due to an uncaught exception: ${err}`);
  process.exit(ExitStatus.Failure);
});

try {
  const server = new SetupServer();
  server.start();

  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  for (const exitSignal of exitSignals) {
    process.on(exitSignal, async () => {
      try {
        await dataSource.destroy();
        logger.info('App exited with success');
        process.exit(ExitStatus.Success);
      } catch (err) {
        logger.error(`Api exited with error: ${err}`);
        process.exit(ExitStatus.Failure);
      }
    });
  }
} catch (err) {
  logger.error(`App exited with error: ${err}`);
  process.exit(ExitStatus.Failure);
}
