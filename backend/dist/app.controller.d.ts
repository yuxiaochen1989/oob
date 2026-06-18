import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        code: number;
        message: string;
        data: {
            time: string;
            version: string;
        };
    };
}
