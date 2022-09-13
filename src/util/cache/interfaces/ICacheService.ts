export interface ICacheService {
  getCache<T>(key: string): Promise<T | null>;
  setCache<T>(key: string, value: T): Promise<unknown>;
  deleteCache(key: string): Promise<number>;
}
