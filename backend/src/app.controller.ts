import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello() {
    return {
      code: 200,
      message: '手工帮 (www.oobang.com) 后端服务已启动成功！',
      data: {
        time: new Date().toLocaleString(),
        version: '1.0.0'
      }
    };
  }
}
