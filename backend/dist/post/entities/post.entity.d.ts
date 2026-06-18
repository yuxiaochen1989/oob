import { User } from '../../user/entities/user.entity';
export declare class PostEntity {
    id: number;
    userId: number;
    user: User;
    title: string;
    content: string;
    type: number;
    media_urls: string[];
    audit_status: number;
    like_count: number;
    collect_count: number;
    comment_count: number;
    create_time: Date;
    update_time: Date;
}
