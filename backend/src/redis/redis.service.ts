import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  // 临时使用内存 Map 模拟 Redis，以便在无 Redis 环境下运行看效果
  private memoryCache = new Map<string, any>();

  async set(key: string, value: any, expireTime?: number): Promise<void> {
    const strValue = typeof value === 'object' ? JSON.stringify(value) : value;
    this.memoryCache.set(key, strValue);
    if (expireTime) {
      setTimeout(() => {
        this.memoryCache.delete(key);
      }, expireTime * 1000);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.memoryCache.get(key) || null;
  }

  async del(key: string): Promise<number> {
    const existed = this.memoryCache.has(key);
    this.memoryCache.delete(key);
    return existed ? 1 : 0;
  }

  getClient(): any {
    return null;
  }
}