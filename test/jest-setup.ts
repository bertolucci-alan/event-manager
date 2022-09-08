import '@src/shared/container';
import supertest from 'supertest';
import { SetupServer } from '@src/app';

beforeAll(() => {
  const server = new SetupServer();
  global.testRequest = supertest(server.getApp());
});
