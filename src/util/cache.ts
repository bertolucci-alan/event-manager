import IORedis from 'ioredis';
import { promisify } from 'util';

export class CacheService {
  constructor(private client: IORedis = new IORedis({ host: 'redis' })) {}

  async getCache<T>(key: string): Promise<T | null> {
    const syncRedisGet = promisify(this.client.get).bind(this.client);
    const cachedValue = await syncRedisGet(key);
    if (!cachedValue) return cachedValue as null;
    return JSON.parse(cachedValue) as T;
  }

  async setCache<T>(key: string, value: T) {
    const syncRedisSet = promisify(this.client.set).bind(this.client);
    return await syncRedisSet(key, JSON.stringify(value));
  }

  async deleteCache(key: string) {
    return this.client.del(key);
  }
}

export default new CacheService();
