import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        message: string;
    }>;
    getProfile(req: any): Promise<import("./entities/user.entity").User>;
}
