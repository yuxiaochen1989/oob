import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: '内容不能为空' })
  @IsString()
  content: string;

  @IsNotEmpty({ message: '请指定内容类型' })
  @IsNumber()
  type: number;

  @IsArray({ message: '媒体资源格式错误' })
  @IsOptional()
  media_urls: string[];
}