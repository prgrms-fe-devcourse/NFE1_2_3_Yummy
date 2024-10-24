import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 게시글 조회' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 업데이트' })
  @UsePipes(new ValidationPipe({ whitelist: true })) // 유효성 검사 파이프 추가
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '특정 게시글 삭제' })
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
