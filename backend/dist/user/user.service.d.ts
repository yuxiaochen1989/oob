import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UserService {
    private userRepository;
    private authService;
    constructor(userRepository: Repository<User>, authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        message: string;
    }>;
    getProfile(userId: number): Promise<User>;
}
