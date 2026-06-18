import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('activity')
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '活动标题', length: 100 })
  title: string;

  @Column({ comment: '活动封面' })
  cover_url: string;

  @Column({ type: 'text', comment: '活动详情描述' })
  description: string;

  @Column({ comment: '城市名称，用于切换城市筛选' })
  city_name: string;

  @Column({ comment: '详细地址' })
  address: string;

  @Column({ type: 'datetime', comment: '活动开始时间' })
  start_time: Date;

  @Column({ type: 'datetime', comment: '活动结束时间' })
  end_time: Date;

  @Column({ default: 0, comment: '最大报名人数' })
  max_participants: number;

  @Column({ default: 0, comment: '当前已报名人数' })
  current_participants: number;

  @Column({ default: 0, comment: '状态：0-筹备中, 1-报名中, 2-进行中, 3-已结束' })
  status: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}