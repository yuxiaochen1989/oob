import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
export declare class AuthService {
    private jwtService;
    private redisService;
    constructor(jwtService: JwtService, redisService: RedisService);
    login(userId: number, roles?: string[]): Promise<{
        access_token: string;
    }>;
    logout(userId: number): Promise<void>;
}
