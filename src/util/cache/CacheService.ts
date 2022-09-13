import IORedis from 'ioredis';
import { promisify } from 'util';
import { ICacheService } from './interfaces/ICacheService';

export class CacheService implements ICacheService {
  private getClient(client: IORedis = new IORedis({ host: 'redis' })) {
    return client;
  }

  async getCache<T>(key: string): Promise<T | null> {
    const syncRedisGet = promisify(this.getClient().get).bind(this.getClient());
    const cachedValue = await syncRedisGet(key);
    if (!cachedValue) return cachedValue as null;
    return JSON.parse(cachedValue) as T;
  }

  async setCache<T>(key: string, value: T): Promise<unknown> {
    const syncRedisSet = promisify(this.getClient().set).bind(this.getClient());
    return await syncRedisSet(key, JSON.stringify(value));
  }

  async deleteCache(key: string): Promise<number> {
    return this.getClient().del(key);
  }
}
