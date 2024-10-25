import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto'; // UpdateCommentDto 임포트

@ApiTags('comments') // 태그 설정
@Controller('post/:postId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @Post()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiResponse({
    status: 201,
    description: '댓글이 성공적으로 생성되었습니다.',
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto, // DTO 사용
  ) {
    return this.commentService.create(
      postId,
      createCommentDto.content,
      createCommentDto.author,
    );
  }

  // 특정 게시글의 댓글 조회
  @Get()
  @ApiOperation({ summary: '특정 게시글의 댓글 조회' })
  @ApiResponse({ status: 200, description: '댓글 목록 반환' })
  async getComments(@Param('postId') postId: string) {
    return this.commentService.findByPostId(postId);
  }

  // 댓글 수정
  @Put(':commentId')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiParam({ name: 'commentId', description: '수정할 댓글 ID' })
  @ApiResponse({
    status: 200,
    description: '댓글이 성공적으로 수정되었습니다.',
  })
  @ApiResponse({ status: 404, description: '댓글을 찾을 수 없습니다.' })
  async updateComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto, // DTO 사용
  ) {
    return this.commentService.update(commentId, updateCommentDto.content);
  }

  // 댓글 삭제
  @Delete(':commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiParam({ name: 'commentId', description: '삭제할 댓글 ID' })
  @ApiResponse({
    status: 200,
    description: '댓글이 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '댓글을 찾을 수 없습니다.' })
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.delete(commentId);
  }
}
