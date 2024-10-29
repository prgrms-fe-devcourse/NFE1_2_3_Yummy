import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('post/:postId/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 생성' })
  @ApiResponse({
    status: 201,
    description: '댓글이 성공적으로 생성되었습니다.',
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ) {
    const userId = req.user._id;
    const user = await this.usersService.findById(userId);

    return this.commentService.create(
      new Types.ObjectId(postId),
      createCommentDto.content,
      userId, // userId를 user로 변경
    );
  }

  @Get()
  @ApiOperation({ summary: '특정 게시글의 댓글 조회' })
  @ApiResponse({ status: 200, description: '댓글 목록 반환' })
  async getComments(@Param('postId') postId: string) {
    return this.commentService.findByPostId(postId);
  }

  @Put(':commentId')
  @UseGuards(JwtAuthGuard)
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
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: any,
  ) {
    const userId = req.user._id;

    const comment = await this.commentService.findById(commentId);
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (!comment.user.equals(userId)) {
      throw new ForbiddenException('자신의 댓글만 수정할 수 있습니다.');
    }
    return this.commentService.update(commentId, updateCommentDto.content);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
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
    @Req() req: any,
  ) {
    const userId = req.user._id;

    const comment = await this.commentService.findById(commentId);
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    if (!comment.user.equals(userId)) {
      throw new ForbiddenException('자신의 댓글만 삭제할 수 있습니다.');
    }

    return this.commentService.delete(commentId);
  }
}
