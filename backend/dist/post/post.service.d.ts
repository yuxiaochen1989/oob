import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { User } from '../user/entities/user.entity';
export declare class PostService implements OnModuleInit {
    private postRepository;
    private userRepository;
    constructor(postRepository: Repository<PostEntity>, userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    create(userId: number, createPostDto: CreatePostDto): Promise<{
        message: string;
        id: number;
    }>;
    findAll(type?: number): Promise<PostEntity[]>;
}
