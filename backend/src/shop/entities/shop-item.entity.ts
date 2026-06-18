import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shop_item')
export class ShopItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '商品名称', length: 100 })
  name: string;

  @Column({ comment: '商品封面图' })
  cover_url: string;

  @Column({ comment: '兑换所需积分' })
  points_price: number;

  @Column({ default: 0, comment: '库存数量' })
  stock: number;

  @Column({ comment: '商品类型：1-虚拟商品, 2-实体商品' })
  type: number;

  @Column({ default: 1, comment: '状态：0-下架, 1-上架' })
  status: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}