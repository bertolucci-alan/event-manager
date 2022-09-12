import '@src/shared/container';

import supertest from 'supertest';
import { SetupServer } from '@src/app';
import { dataSource } from '@src/database';

beforeAll(async () => {
  const server = new SetupServer();
  await dataSource.initialize();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  await dataSource.destroy();
});
