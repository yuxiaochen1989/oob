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
exports.PostEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
let PostEntity = class PostEntity {
    id;
    userId;
    user;
    title;
    content;
    type;
    media_urls;
    audit_status;
    like_count;
    collect_count;
    comment_count;
    create_time;
    update_time;
};
exports.PostEntity = PostEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], PostEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PostEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '标题', length: 100 }),
    __metadata("design:type", String)
], PostEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '正文内容' }),
    __metadata("design:type", String)
], PostEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '类型：1-图文笔记, 2-视频笔记, 3-图文教程, 4-视频教程' }),
    __metadata("design:type", Number)
], PostEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', comment: '媒体资源URL列表 (图片或视频)' }),
    __metadata("design:type", Array)
], PostEntity.prototype, "media_urls", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '审核状态：0-待审核, 1-通过, 2-拒绝' }),
    __metadata("design:type", Number)
], PostEntity.prototype, "audit_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '点赞数' }),
    __metadata("design:type", Number)
], PostEntity.prototype, "like_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '收藏数' }),
    __metadata("design:type", Number)
], PostEntity.prototype, "collect_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '评论数' }),
    __metadata("design:type", Number)
], PostEntity.prototype, "comment_count", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PostEntity.prototype, "create_time", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PostEntity.prototype, "update_time", void 0);
exports.PostEntity = PostEntity = __decorate([
    (0, typeorm_1.Entity)('post')
], PostEntity);
//# sourceMappingURL=post.entity.js.map