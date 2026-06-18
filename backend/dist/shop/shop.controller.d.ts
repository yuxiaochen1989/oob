import { ShopService } from './shop.service';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    checkIn(req: any): Promise<{
        message: string;
        points_added: number;
        current_points: number;
    }>;
    getShopItems(): Promise<import("./entities/shop-item.entity").ShopItemEntity[]>;
    exchangeItem(req: any, itemId: string): Promise<{
        message: string;
        current_points: number;
    }>;
}
