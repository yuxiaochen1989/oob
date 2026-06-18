import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ShopItemEntity } from './entities/shop-item.entity';
import { PointLogEntity } from './entities/point-log.entity';
import { User } from '../user/entities/user.entity';
export declare class ShopService implements OnModuleInit {
    private shopItemRepository;
    private pointLogRepository;
    private userRepository;
    constructor(shopItemRepository: Repository<ShopItemEntity>, pointLogRepository: Repository<PointLogEntity>, userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    checkIn(userId: number): Promise<{
        message: string;
        points_added: number;
        current_points: number;
    }>;
    getShopItems(): Promise<ShopItemEntity[]>;
    exchangeItem(userId: number, itemId: number): Promise<{
        message: string;
        current_points: number;
    }>;
}
