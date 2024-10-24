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

@Controller('post/:postId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 생성
  @Post()
  async createComment(
    @Param('postId') postId: string,
    @Body('content') content: string,
    @Body('author') author: string,
  ) {
    return this.commentService.create(postId, content, author);
  }

  // 특정 게시글의 댓글 조회
  @Get()
  async getComments(@Param('postId') postId: string) {
    return this.commentService.findByPostId(postId);
  }

  // 댓글 수정
  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body('content') content: string,
  ) {
    return this.commentService.update(commentId, content);
  }

  // 댓글 삭제
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.delete(commentId);
  }
}
