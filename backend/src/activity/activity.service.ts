import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { ActivitySignupEntity } from './entities/activity-signup.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ActivityService implements OnModuleInit {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
    @InjectRepository(ActivitySignupEntity)
    private signupRepository: Repository<ActivitySignupEntity>,
  ) {}

  // 模块初始化时，造点假数据方便看效果
  async onModuleInit() {
    const count = await this.activityRepository.count();
    if (count === 0) {
      await this.activityRepository.save([
        {
          title: '周末陶艺DIY手作体验营',
          cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          description: '一起体验泥土的温度...',
          city_name: '北京市',
          address: '朝阳区 798 艺术区',
          start_time: new Date('2026-06-20 14:00:00'),
          end_time: new Date('2026-06-20 17:00:00'),
          max_participants: 20,
          status: 1
        },
        {
          title: '外滩皮具手缝交流沙龙',
          cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          description: '手工皮具爱好者交流会...',
          city_name: '上海市',
          address: '黄浦区 外滩十八号',
          start_time: new Date('2026-06-21 10:00:00'),
          end_time: new Date('2026-06-21 16:00:00'),
          max_participants: 15,
          status: 1
        }
      ]);
    }
  }

  async findAll(cityName?: string) {
    const query = this.activityRepository.createQueryBuilder('activity')
      .where('activity.status != :status', { status: 0 })
      .orderBy('activity.start_time', 'ASC');

    if (cityName && cityName !== '全部城市') {
      query.andWhere('activity.city_name = :cityName', { cityName });
    }

    return await query.getMany();
  }

  async signup(userId: number, activityId: number) {
    const activity = await this.activityRepository.findOne({ where: { id: activityId } });
    if (!activity) throw new BadRequestException('活动不存在');
    if (activity.status !== 1) throw new BadRequestException('活动不在报名状态');
    if (activity.current_participants >= activity.max_participants) throw new BadRequestException('报名名额已满');

    const exist = await this.signupRepository.findOne({ where: { userId, activityId } });
    if (exist) throw new BadRequestException('您已经报名过该活动了');

    // 生成核销码
    const qrCode = uuidv4();
    const signup = this.signupRepository.create({
      userId,
      activityId,
      qr_code: qrCode,
      status: 0
    });

    // 实际项目中这里需要用事务
    await this.signupRepository.save(signup);
    activity.current_participants += 1;
    await this.activityRepository.save(activity);

    return { message: '报名成功', qrCode };
  }
}
