import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ comment: '标题', length: 100 })
  title: string;

  @Column({ type: 'text', comment: '正文内容' })
  content: string;

  @Column({ comment: '类型：1-图文笔记, 2-视频笔记, 3-图文教程, 4-视频教程' })
  type: number;

  @Column({ type: 'json', comment: '媒体资源URL列表 (图片或视频)' })
  media_urls: string[];

  @Column({ default: 0, comment: '审核状态：0-待审核, 1-通过, 2-拒绝' })
  audit_status: number;

  @Column({ default: 0, comment: '点赞数' })
  like_count: number;

  @Column({ default: 0, comment: '收藏数' })
  collect_count: number;

  @Column({ default: 0, comment: '评论数' })
  comment_count: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}