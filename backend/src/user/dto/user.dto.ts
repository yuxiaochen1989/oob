import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: '账号不能为空' })
  @Length(4, 20, { message: '账号长度在 4 到 20 个字符之间' })
  username: string;

  @IsNotEmpty({ message: '手机号不能为空' })
  @Length(11, 11, { message: '请输入11位手机号' })
  phone: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度在 6 到 20 个字符之间' })
  password: string;
}

export class LoginDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  phone?: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}