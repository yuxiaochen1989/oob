import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  /**
   * 设置键值对
   * @param key 键
   * @param value 值
   * @param expireTime 过期时间（秒）
   */
  async set(key: string, value: any, expireTime?: number): Promise<void> {
    const strValue = typeof value === 'object' ? JSON.stringify(value) : value;
    if (expireTime) {
      await this.redisClient.set(key, strValue, 'EX', expireTime);
    } else {
      await this.redisClient.set(key, strValue);
    }
  }

  /**
   * 获取值
   * @param key 键
   */
  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  /**
   * 删除键
   * @param key 键
   */
  async del(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  /**
   * 获取 Redis 原生客户端，用于复杂操作（如 GEO、分布式锁等）
   */
  getClient(): Redis {
    return this.redisClient;
  }
}