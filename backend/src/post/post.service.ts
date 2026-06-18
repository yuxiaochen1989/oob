import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PostService implements OnModuleInit {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.postRepository.count();
    if (count === 0) {
      // 先创建一个官方号用于发教程
      let admin = await this.userRepository.findOne({ where: { username: 'admin' } });
      if (!admin) {
        const salt = bcrypt.genSaltSync(10);
        admin = this.userRepository.create({
          username: 'admin',
          phone: '13800000000',
          password: bcrypt.hashSync('123456', salt),
          nickname: '手工帮官方',
          avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
        });
        await this.userRepository.save(admin);
      }

      await this.postRepository.save([
        {
          userId: admin.id,
          title: '【图文教程】零基础制作复古小牛皮钱包',
          content: '第一步：准备好皮料和工具；第二步：打孔；第三步：缝线...',
          type: 3, // 3-图文教程
          media_urls: ['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'],
          audit_status: 1,
          like_count: 120,
          collect_count: 50,
        },
        {
          userId: admin.id,
          title: '【视频教程】10分钟学会毛线编织小熊',
          content: '今天教大家用钩针编织一只可爱的小熊，非常适合新手哦！',
          type: 4, // 4-视频教程
          media_urls: ['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'], // 假装这是视频封面
          audit_status: 1,
          like_count: 340,
          collect_count: 210,
        }
      ]);
    }
  }

  async create(userId: number, createPostDto: CreatePostDto) {
    const post = this.postRepository.create({
      ...createPostDto,
      userId,
      audit_status: 1, // 为了演示，暂时默认直接审核通过
    });
    await this.postRepository.save(post);
    return { message: '发布成功', id: post.id };
  }

  async findAll(type?: number) {
    const query = this.postRepository.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.audit_status = :status', { status: 1 })
      .orderBy('post.create_time', 'DESC');

    if (type) {
      query.andWhere('post.type = :type', { type });
    }

    query.select({
      post: {
        id: true,
        title: true,
        content: true,
        type: true,
        media_urls: true,
        like_count: true,
        collect_count: true,
        comment_count: true,
        create_time: true,
      },
      user: {
        id: true,
        nickname: true,
        avatar: true,
      }
    });

    return await query.getMany();
  }
}
