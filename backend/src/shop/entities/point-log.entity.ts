import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('point_log')
export class PointLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ comment: '来源：1-每日签到, 2-发帖奖励, 3-商城消费' })
  action: number;

  @Column({ comment: '变动数量，正负值' })
  amount: number;

  @Column({ comment: '描述说明' })
  description: string;

  @CreateDateColumn()
  create_time: Date;
}