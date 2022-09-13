import IORedis from 'ioredis';
import { promisify } from 'util';
import logger from '../logger';
import { ICacheService } from './interfaces/ICacheService';

export class CacheService implements ICacheService {
  private getClient(client: IORedis = new IORedis({ host: 'redis' })) {
    return client;
  }

  async getCache<T>(key: string): Promise<T | null> {
    logger.info(`get cached of key: ${key}`);
    const syncRedisGet = promisify(this.getClient().get).bind(this.getClient());
    const cachedValue = await syncRedisGet(key);
    if (!cachedValue) return cachedValue as null;
    logger.info(`success get cache of key: ${key}, value: ${cachedValue}`);
    return JSON.parse(cachedValue) as T;
  }

  async setCache<T>(key: string, value: T): Promise<unknown> {
    logger.info(`set cached of key: ${key}`);
    const syncRedisSet = promisify(this.getClient().set).bind(this.getClient());
    const cachedValue = await syncRedisSet(key, JSON.stringify(value));
    logger.info(
      `success set cache of key: ${key}, value: ${JSON.stringify(value)}`
    );
    return cachedValue;
  }

  async deleteCache(key: string): Promise<number> {
    logger.info(`delete cached of key: ${key}`);
    return this.getClient().del(key);
  }
}
