import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ description: '댓글 내용' })
  content?: string;

  @ApiProperty({ description: '작성자 이름' })
  author?: string;
}
