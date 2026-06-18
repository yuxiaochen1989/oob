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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shop_item_entity_1 = require("./entities/shop-item.entity");
const point_log_entity_1 = require("./entities/point-log.entity");
const user_entity_1 = require("../user/entities/user.entity");
let ShopService = class ShopService {
    shopItemRepository;
    pointLogRepository;
    userRepository;
    constructor(shopItemRepository, pointLogRepository, userRepository) {
        this.shopItemRepository = shopItemRepository;
        this.pointLogRepository = pointLogRepository;
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        const count = await this.shopItemRepository.count();
        if (count === 0) {
            await this.shopItemRepository.save([
                {
                    name: '手工帮定制帆布包材料包',
                    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                    points_price: 500,
                    stock: 50,
                    type: 2,
                    status: 1
                },
                {
                    name: '高级手作视频课程解锁卡',
                    cover_url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                    points_price: 200,
                    stock: 999,
                    type: 1,
                    status: 1
                }
            ]);
        }
    }
    async checkIn(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const existLog = await this.pointLogRepository.findOne({
            where: {
                userId,
                action: 1,
                create_time: (0, typeorm_2.Between)(today, tomorrow),
            }
        });
        if (existLog) {
            throw new common_1.BadRequestException('今天已经签到过了哦');
        }
        const checkInPoints = 10;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('用户不存在');
        user.points += checkInPoints;
        await this.userRepository.save(user);
        const log = this.pointLogRepository.create({
            userId,
            action: 1,
            amount: checkInPoints,
            description: '每日签到奖励'
        });
        await this.pointLogRepository.save(log);
        return { message: '签到成功', points_added: checkInPoints, current_points: user.points };
    }
    async getShopItems() {
        return await this.shopItemRepository.find({
            where: { status: 1 },
            order: { create_time: 'DESC' }
        });
    }
    async exchangeItem(userId, itemId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const item = await this.shopItemRepository.findOne({ where: { id: itemId } });
        if (!user || !item)
            throw new common_1.BadRequestException('数据不存在');
        if (item.stock <= 0)
            throw new common_1.BadRequestException('商品库存不足');
        if (user.points < item.points_price)
            throw new common_1.BadRequestException('积分不足');
        user.points -= item.points_price;
        item.stock -= 1;
        await this.userRepository.save(user);
        await this.shopItemRepository.save(item);
        const log = this.pointLogRepository.create({
            userId,
            action: 3,
            amount: -item.points_price,
            description: `兑换商城商品: ${item.name}`
        });
        await this.pointLogRepository.save(log);
        return { message: '兑换成功', current_points: user.points };
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shop_item_entity_1.ShopItemEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(point_log_entity_1.PointLogEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ShopService);
//# sourceMappingURL=shop.service.js.map