import { User } from '../../user/entities/user.entity';
export declare class PointLogEntity {
    id: number;
    userId: number;
    user: User;
    action: number;
    amount: number;
    description: string;
    create_time: Date;
}
