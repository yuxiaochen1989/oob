import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

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

    // 只选取需要的用户字段
    query.select([
      'post',
      'user.id',
      'user.nickname',
      'user.avatar',
    ]);

    return await query.getMany();
  }
}
