import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 1. 全局配置模块
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 2. TypeORM 数据库配置 (为方便您预览效果，这里临时使用 SQLite 替代 MySQL)
    TypeOrmModule.forRoot({
      type: 'better-sqlite3' as any,
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true, // 开发环境开启自动同步表结构
    }),
    // 3. 全局 Redis 模块
    RedisModule,
    // 4. 鉴权模块
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局注册 JWT 守卫，所有接口默认需要登录（可用 @Public() 放行）
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 全局注册 角色 守卫
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
