import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  /**
   * 生成 Token，并管理多端登录状态
   * 这里模拟了类似 SaToken 的会话管理机制
   */
  async login(userId: number, roles: string[] = []) {
    // 每次登录生成一个随机版本号，存入 Redis
    const tokenVersion = uuidv4();
    
    // JWT 有效期为 7 天 (对应 Redis 的 604800 秒)
    await this.redisService.set(`user_token_v:${userId}`, tokenVersion, 604800);

    const payload = { userId, roles, version: tokenVersion };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * 退出登录（主动失效 Token）
   */
  async logout(userId: number) {
    await this.redisService.del(`user_token_v:${userId}`);
  }
}