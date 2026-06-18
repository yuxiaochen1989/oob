import { User } from '../../user/entities/user.entity';
import { ActivityEntity } from './activity.entity';
export declare class ActivitySignupEntity {
    id: number;
    userId: number;
    user: User;
    activityId: number;
    activity: ActivityEntity;
    qr_code: string;
    status: number;
    create_time: Date;
}
