import { ActivityService } from './activity.service';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    findAll(city?: string): Promise<import("./entities/activity.entity").ActivityEntity[]>;
    signup(req: any, id: string): Promise<{
        message: string;
        qrCode: string;
    }>;
}
