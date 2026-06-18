import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityEntity } from './entities/activity.entity';
import { ActivitySignupEntity } from './entities/activity-signup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity, ActivitySignupEntity])],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
