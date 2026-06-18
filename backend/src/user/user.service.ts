import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { RegisterDto, LoginDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, phone, password } = registerDto;

    // 检查是否已存在
    const existUser = await this.userRepository.findOne({
      where: [{ username }, { phone }],
    });
    if (existUser) {
      throw new BadRequestException('账号或手机号已被注册');
    }

    // 密码加密
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = this.userRepository.create({
      username,
      phone,
      password: hashedPassword,
      nickname: `手工客_${phone.slice(-4)}`,
    });

    await this.userRepository.save(newUser);
    return { message: '注册成功' };
  }

  async login(loginDto: LoginDto) {
    const { username, phone, password } = loginDto;
    
    if (!username && !phone) {
      throw new BadRequestException('请输入账号或手机号');
    }

    // 根据账号或手机号查找用户，注意密码字段默认 selected: false，需手动加上
    const user = await this.userRepository.findOne({
      where: username ? { username } : { phone },
      select: ['id', 'username', 'phone', 'password', 'status'],
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    if (user.status === 0) {
      throw new BadRequestException('账号已被封禁');
    }

    // 校验密码
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('密码错误');
    }

    // 生成 Token
    const tokenInfo = await this.authService.login(user.id, ['user']);
    
    return {
      message: '登录成功',
      ...tokenInfo,
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    return user;
  }
}
