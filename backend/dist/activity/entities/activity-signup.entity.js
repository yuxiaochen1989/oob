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
exports.ActivitySignupEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const activity_entity_1 = require("./activity.entity");
let ActivitySignupEntity = class ActivitySignupEntity {
    id;
    userId;
    user;
    activityId;
    activity;
    qr_code;
    status;
    create_time;
};
exports.ActivitySignupEntity = ActivitySignupEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActivitySignupEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ActivitySignupEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ActivitySignupEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activity_id' }),
    __metadata("design:type", Number)
], ActivitySignupEntity.prototype, "activityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activity_entity_1.ActivityEntity),
    (0, typeorm_1.JoinColumn)({ name: 'activity_id' }),
    __metadata("design:type", activity_entity_1.ActivityEntity)
], ActivitySignupEntity.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, comment: '核销二维码唯一标识' }),
    __metadata("design:type", String)
], ActivitySignupEntity.prototype, "qr_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '状态：0-已报名待参加, 1-已核销, 2-已取消' }),
    __metadata("design:type", Number)
], ActivitySignupEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ActivitySignupEntity.prototype, "create_time", void 0);
exports.ActivitySignupEntity = ActivitySignupEntity = __decorate([
    (0, typeorm_1.Entity)('activity_signup')
], ActivitySignupEntity);
//# sourceMappingURL=activity-signup.entity.js.map