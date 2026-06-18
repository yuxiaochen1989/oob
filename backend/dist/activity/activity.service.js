"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_entity_1 = require("./entities/activity.entity");
const activity_signup_entity_1 = require("./entities/activity-signup.entity");
const uuid_1 = require("uuid");
let ActivityService = class ActivityService {
    activityRepository;
    signupRepository;
    constructor(activityRepository, signupRepository) {
        this.activityRepository = activityRepository;
        this.signupRepository = signupRepository;
    }
    async onModuleInit() {
        const count = await this.activityRepository.count();
        if (count === 0) {
            await this.activityRepository.save([
                {
                    title: '周末陶艺DIY手作体验营',
                    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                    description: '一起体验泥土的温度...',
                    city_name: '北京市',
                    address: '朝阳区 798 艺术区',
                    start_time: new Date('2026-06-20 14:00:00'),
                    end_time: new Date('2026-06-20 17:00:00'),
                    max_participants: 20,
                    status: 1
                },
                {
                    title: '外滩皮具手缝交流沙龙',
                    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                    description: '手工皮具爱好者交流会...',
                    city_name: '上海市',
                    address: '黄浦区 外滩十八号',
                    start_time: new Date('2026-06-21 10:00:00'),
                    end_time: new Date('2026-06-21 16:00:00'),
                    max_participants: 15,
                    status: 1
                }
            ]);
        }
    }
    async findAll(cityName) {
        const query = this.activityRepository.createQueryBuilder('activity')
            .where('activity.status != :status', { status: 0 })
            .orderBy('activity.start_time', 'ASC');
        if (cityName && cityName !== '全部城市') {
            query.andWhere('activity.city_name = :cityName', { cityName });
        }
        return await query.getMany();
    }
    async signup(userId, activityId) {
        const activity = await this.activityRepository.findOne({ where: { id: activityId } });
        if (!activity)
            throw new common_1.BadRequestException('活动不存在');
        if (activity.status !== 1)
            throw new common_1.BadRequestException('活动不在报名状态');
        if (activity.current_participants >= activity.max_participants)
            throw new common_1.BadRequestException('报名名额已满');
        const exist = await this.signupRepository.findOne({ where: { userId, activityId } });
        if (exist)
            throw new common_1.BadRequestException('您已经报名过该活动了');
        const qrCode = (0, uuid_1.v4)();
        const signup = this.signupRepository.create({
            userId,
            activityId,
            qr_code: qrCode,
            status: 0
        });
        await this.signupRepository.save(signup);
        activity.current_participants += 1;
        await this.activityRepository.save(activity);
        return { message: '报名成功', qrCode };
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.ActivityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(activity_signup_entity_1.ActivitySignupEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ActivityService);
//# sourceMappingURL=activity.service.js.map