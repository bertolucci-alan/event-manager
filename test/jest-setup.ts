import '@src/database/index';
import '@src/shared/container';

import supertest from 'supertest';
import { SetupServer } from '@src/app';
import { dataSource } from '@src/database/index';

beforeAll(async () => {
  const server = new SetupServer();
  await dataSource
    .initialize()
    .then(() => console.log('DataSource initialize in jest-setup'));
  global.testRequest = supertest(server.getApp());
});
