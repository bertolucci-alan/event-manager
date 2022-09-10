import '@src/database/index';
import '@src/shared/container';

import supertest from 'supertest';
import { SetupServer } from '@src/app';

beforeAll(async () => {
  const server = new SetupServer();
  global.testRequest = supertest(server.getApp());
});
