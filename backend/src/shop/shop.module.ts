import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopItemEntity } from './entities/shop-item.entity';
import { PointLogEntity } from './entities/point-log.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopItemEntity, PointLogEntity, User])],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
