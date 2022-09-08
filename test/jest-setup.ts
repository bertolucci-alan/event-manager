import supertest from 'supertest';
import { SetupServer } from './app';

beforeAll(() => {
  const server = new SetupServer();
  global.testRequest = supertest(server.getApp());
});
