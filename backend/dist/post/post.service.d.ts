import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/post.dto';
export declare class PostService {
    private postRepository;
    constructor(postRepository: Repository<PostEntity>);
    create(userId: number, createPostDto: CreatePostDto): Promise<{
        message: string;
        id: number;
    }>;
    findAll(type?: number): Promise<PostEntity[]>;
}
