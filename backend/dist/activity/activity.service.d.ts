import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { ActivitySignupEntity } from './entities/activity-signup.entity';
export declare class ActivityService implements OnModuleInit {
    private activityRepository;
    private signupRepository;
    constructor(activityRepository: Repository<ActivityEntity>, signupRepository: Repository<ActivitySignupEntity>);
    onModuleInit(): Promise<void>;
    findAll(cityName?: string): Promise<ActivityEntity[]>;
    signup(userId: number, activityId: number): Promise<{
        message: string;
        qrCode: string;
    }>;
}
