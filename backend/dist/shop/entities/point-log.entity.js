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
exports.PointLogEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
let PointLogEntity = class PointLogEntity {
    id;
    userId;
    user;
    action;
    amount;
    description;
    create_time;
};
exports.PointLogEntity = PointLogEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PointLogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], PointLogEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PointLogEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '来源：1-每日签到, 2-发帖奖励, 3-商城消费' }),
    __metadata("design:type", Number)
], PointLogEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '变动数量，正负值' }),
    __metadata("design:type", Number)
], PointLogEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '描述说明' }),
    __metadata("design:type", String)
], PointLogEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PointLogEntity.prototype, "create_time", void 0);
exports.PointLogEntity = PointLogEntity = __decorate([
    (0, typeorm_1.Entity)('point_log')
], PointLogEntity);
//# sourceMappingURL=point-log.entity.js.map