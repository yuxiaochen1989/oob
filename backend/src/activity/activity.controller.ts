import { Controller, Get, Post, Param, Query, Req } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Public()
  @Get('list')
  findAll(@Query('city') city?: string) {
    return this.activityService.findAll(city);
  }

  @Post('signup/:id')
  signup(@Req() req: any, @Param('id') id: string) {
    return this.activityService.signup(req.user.userId, +id);
  }
}
