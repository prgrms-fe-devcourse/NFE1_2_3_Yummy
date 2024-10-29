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
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('post')
@ApiBearerAuth() // JWT 토큰을 사용하는 API
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 생성' })
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const userId = req.user._id; // JWT 토큰에서 사용자 ID 추출

    return this.postService.create(createPostDto, userId);
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

  @Get('search/title')
  @ApiOperation({ summary: '게시글 제목으로 검색' })
  searchByTitle(@Query('keyword') keyword: string) {
    return this.postService.searchByTitle(keyword);
  }

  @Get('search/content')
  @ApiOperation({ summary: '게시글 내용으로 검색' })
  searchByContent(@Query('keyword') keyword: string) {
    return this.postService.searchByContent(keyword);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 업데이트' })
  @UsePipes(new ValidationPipe({ whitelist: true })) // 유효성 검사 파이프 추가
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: any,
  ) {
    const userId = req.user._id; // JWT 토큰에서 사용자 ID 추출
    return this.postService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '특정 게시글 삭제' })
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user._id; // JWT 토큰에서 사용자 ID 추출
    return this.postService.remove(id, userId);
  }
}
