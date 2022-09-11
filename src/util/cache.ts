import redis from 'redis';
import { promisify } from 'util';
class RedisCacheService {
  constructor(private client = redis.createClient()) {}

  setCache(key: string, value: string) {
    const syncRedisSet = promisify(this.client.set).bind(this.client);
    return syncRedisSet(key, value);
  }

  getCache<T>(key: string): T {
    const syncRedisGet = promisify(this.client.get).bind(this.client);
    return syncRedisGet(key);
  }

  deleteCache(key: string) {
    const syncRedisDelete = promisify(this.client.del).bind(this.client);
    return syncRedisDelete(key);
  }
}
export default new RedisCacheService();
