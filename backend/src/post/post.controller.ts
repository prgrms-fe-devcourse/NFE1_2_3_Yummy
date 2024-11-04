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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginatedPostsDto } from './dto/paginated-post.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

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

  @Post(':postId/like')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '좋아요 기능',
    description: '해당 포스트에 좋아요를 누르거나 취소합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요 상태가 성공적으로 업데이트되었습니다.',
  })
  @ApiResponse({ status: 404, description: '포스트를 찾을 수 없습니다.' })
  async likePost(@Param('postId') postId: string, @Req() req: any) {
    const user: UserDocument = req.user;
    return this.postService.likePost(postId, user);
  }

  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 게시글을 반환합니다.',
    type: PaginatedPostsDto,
  })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지당 게시글 수',
    required: false,
    example: 10,
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.postService.findAll(+page, +limit);
  }

  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 게시글 조회' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 카테고리별 게시글을 반환합니다.',
  })
  findByCategory(@Param('category') category: string) {
    if (category === '전체') {
      return this.postService.findAllPosts();
    }
    return this.postService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 게시글 조회' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get('search/title')
  @ApiOperation({ summary: '게시글 제목으로 검색' })
  @ApiQuery({ name: 'keyword', description: '검색 키워드', required: true })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지당 게시글 수',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 검색된 게시글 목록을 반환합니다.',
    type: PaginatedPostsDto,
  })
  searchByTitle(
    @Query('keyword') keyword: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.postService.searchByTitle(keyword, +page, +limit);
  }

  @Get('search/content')
  @ApiOperation({ summary: '게시글 내용으로 검색' })
  @ApiQuery({ name: 'keyword', description: '검색 키워드', required: true })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지당 게시글 수',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 검색된 게시글 목록을 반환합니다.',
    type: PaginatedPostsDto,
  })
  searchByContent(
    @Query('keyword') keyword: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.postService.searchByContent(keyword, +page, +limit);
  }

  @Get('search/nickname')
  @ApiOperation({ summary: '사용자 닉네임으로 게시글 검색' })
  @ApiQuery({ name: 'nickname', description: '사용자 닉네임', required: true })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지당 게시글 수',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 검색된 게시글 목록을 반환합니다.',
    type: PaginatedPostsDto,
  })
  searchByNickname(
    @Query('nickname') nickname: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.postService.searchByNickname(nickname, +page, +limit);
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
