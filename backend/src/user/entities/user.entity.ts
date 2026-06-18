import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: '用户名/账号' })
  username: string;

  @Column({ unique: true, comment: '手机号' })
  phone: string;

  @Column({ select: false, comment: '加密密码' })
  password: string;

  @Column({ nullable: true, comment: '昵称' })
  nickname: string;

  @Column({ nullable: true, comment: '头像URL' })
  avatar: string;

  @Column({ default: 0, comment: '当前积分' })
  points: number;

  @Column({ default: 1, comment: '状态：0-封禁, 1-正常' })
  status: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}