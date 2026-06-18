import { Controller, Post, Get, Param, Req } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('checkin')
  checkIn(@Req() req: any) {
    return this.shopService.checkIn(req.user.userId);
  }

  @Public()
  @Get('items')
  getShopItems() {
    return this.shopService.getShopItems();
  }

  @Post('exchange/:itemId')
  exchangeItem(@Req() req: any, @Param('itemId') itemId: string) {
    return this.shopService.exchangeItem(req.user.userId, +itemId);
  }
}
