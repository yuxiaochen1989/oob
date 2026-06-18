import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // payload 是 JWT 解码后的数据，例如 { userId: 1, roles: ['admin'] }
    
    // 配合 Redis 实现 Token 状态控制（如：踢人下线，或者主动注销）
    // 假设我们在登录时将 token 存入 redis：key 为 `token:${userId}`
    const tokenVersion = await this.redisService.get(`user_token_v:${payload.userId}`);
    
    if (tokenVersion && tokenVersion !== payload.version) {
      throw new UnauthorizedException('您的账号已在其他设备登录或Token已失效');
    }

    return { userId: payload.userId, roles: payload.roles || [] };
  }
}