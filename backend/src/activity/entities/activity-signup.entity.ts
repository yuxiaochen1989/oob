import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ActivityEntity } from './activity.entity';

@Entity('activity_signup')
export class ActivitySignupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'activity_id' })
  activityId: number;

  @ManyToOne(() => ActivityEntity)
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  @Column({ unique: true, comment: '核销二维码唯一标识' })
  qr_code: string;

  @Column({ default: 0, comment: '状态：0-已报名待参加, 1-已核销, 2-已取消' })
  status: number;

  @CreateDateColumn()
  create_time: Date;
}