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
exports.ShopItemEntity = void 0;
const typeorm_1 = require("typeorm");
let ShopItemEntity = class ShopItemEntity {
    id;
    name;
    cover_url;
    points_price;
    stock;
    type;
    status;
    create_time;
    update_time;
};
exports.ShopItemEntity = ShopItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '商品名称', length: 100 }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '商品封面图' }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "cover_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '兑换所需积分' }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "points_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, comment: '库存数量' }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '商品类型：1-虚拟商品, 2-实体商品' }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1, comment: '状态：0-下架, 1-上架' }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ShopItemEntity.prototype, "create_time", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ShopItemEntity.prototype, "update_time", void 0);
exports.ShopItemEntity = ShopItemEntity = __decorate([
    (0, typeorm_1.Entity)('shop_item')
], ShopItemEntity);
//# sourceMappingURL=shop-item.entity.js.map