import '@src/shared/container';

import supertest from 'supertest';
import { SetupServer } from '@src/app';
import { dataSource } from '@src/database';
import { mock } from 'jest-mock-extended';
import { CacheService } from './util/cache/CacheService';
const cacheServiceMock = mock<CacheService>();

beforeAll(async () => {
  const server = new SetupServer();
  await dataSource.initialize();
  cacheServiceMock.getCache.mockResolvedValue(null);
  cacheServiceMock.setCache.mockResolvedValue(null);
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  await dataSource.destroy();
});
