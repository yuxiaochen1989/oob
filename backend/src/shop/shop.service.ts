import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ShopItemEntity } from './entities/shop-item.entity';
import { PointLogEntity } from './entities/point-log.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ShopService implements OnModuleInit {
  constructor(
    @InjectRepository(ShopItemEntity)
    private shopItemRepository: Repository<ShopItemEntity>,
    @InjectRepository(PointLogEntity)
    private pointLogRepository: Repository<PointLogEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.shopItemRepository.count();
    if (count === 0) {
      await this.shopItemRepository.save([
        {
          name: '手工帮定制帆布包材料包',
          cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          points_price: 500,
          stock: 50,
          type: 2,
          status: 1
        },
        {
          name: '高级手作视频课程解锁卡',
          cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          points_price: 200,
          stock: 999,
          type: 1,
          status: 1
        }
      ]);
    }
  }

  // 每日签到
  async checkIn(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 检查今天是否已签到
    const existLog = await this.pointLogRepository.findOne({
      where: {
        userId,
        action: 1,
        create_time: Between(today, tomorrow),
      }
    });

    if (existLog) {
      throw new BadRequestException('今天已经签到过了哦');
    }

    const checkInPoints = 10; // 每次签到10积分

    // 给用户加积分 (实际应用中需加事务锁)
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException('用户不存在');
    
    user.points += checkInPoints;
    await this.userRepository.save(user);

    // 记录流水
    const log = this.pointLogRepository.create({
      userId,
      action: 1,
      amount: checkInPoints,
      description: '每日签到奖励'
    });
    await this.pointLogRepository.save(log);

    return { message: '签到成功', points_added: checkInPoints, current_points: user.points };
  }

  // 获取商品列表
  async getShopItems() {
    return await this.shopItemRepository.find({
      where: { status: 1 },
      order: { create_time: 'DESC' }
    });
  }

  // 兑换商品
  async exchangeItem(userId: number, itemId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const item = await this.shopItemRepository.findOne({ where: { id: itemId } });

    if (!user || !item) throw new BadRequestException('数据不存在');
    if (item.stock <= 0) throw new BadRequestException('商品库存不足');
    if (user.points < item.points_price) throw new BadRequestException('积分不足');

    // 扣减积分与库存 (实际应用中需严格的事务与 Redis 分布式锁防超卖)
    user.points -= item.points_price;
    item.stock -= 1;

    await this.userRepository.save(user);
    await this.shopItemRepository.save(item);

    // 记录流水
    const log = this.pointLogRepository.create({
      userId,
      action: 3,
      amount: -item.points_price,
      description: `兑换商城商品: ${item.name}`
    });
    await this.pointLogRepository.save(log);

    return { message: '兑换成功', current_points: user.points };
  }
}
