import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(req: any, createPostDto: CreatePostDto): Promise<{
        message: string;
        id: number;
    }>;
    findAll(type?: string): Promise<import("./entities/post.entity").PostEntity[]>;
}
