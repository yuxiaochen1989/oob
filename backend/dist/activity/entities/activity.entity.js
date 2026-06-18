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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityEntity = void 0;
const typeorm_1 = require("typeorm");
let ActivityEntity = class ActivityEntity {
    id;
    title;
    cover_url;
    description;
    city_name;
    address;
    start_time;
    end_time;
    max_participants;
    current_participants;
    status;
    create_time;
    update_time;
};
exports.ActivityEntity = ActivityEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActivityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '活动标题', length: 100 }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '活动封面' }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "cover_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '活动详情描述' }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '城市名称，用于切换城市筛选' }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "city_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '详细地址' }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', comment: '活动开始时间' }),
    __metadata("design:type", Date)
], ActivityEntity.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', comment: '活动结束时间' }),
    __metadata("design:type", Date)
], ActivityEntity.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '最大报名人数' }),
    __metadata("design:type", Number)
], ActivityEntity.prototype, "max_participants", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '当前已报名人数' }),
    __metadata("design:type", Number)
], ActivityEntity.prototype, "current_participants", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '状态：0-筹备中, 1-报名中, 2-进行中, 3-已结束' }),
    __metadata("design:type", Number)
], ActivityEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ActivityEntity.prototype, "create_time", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ActivityEntity.prototype, "update_time", void 0);
exports.ActivityEntity = ActivityEntity = __decorate([
    (0, typeorm_1.Entity)('activity')
], ActivityEntity);
//# sourceMappingURL=activity.entity.js.map