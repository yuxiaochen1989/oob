import { Controller, Post, Get, Body, Req, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Req() req: any, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user.userId, createPostDto);
  }

  @Public()
  @Get('list')
  findAll(@Query('type') type?: string) {
    return this.postService.findAll(type ? Number(type) : undefined);
  }
}
