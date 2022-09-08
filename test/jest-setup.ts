import '@src/database/index';
import '@src/shared/container';

import supertest from 'supertest';
import { SetupServer } from '@src/app';
import { dataSource } from '@src/database/index';

beforeAll(async () => {
  const server = new SetupServer();
  await dataSource.initialize().then(() => console.log('INICIOU NO TESTE'));
  global.testRequest = supertest(server.getApp());
});
