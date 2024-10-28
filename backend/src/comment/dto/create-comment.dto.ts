import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '댓글 내용' }) // Swagger 설명
  @IsNotEmpty({ message: '댓글 내용을 입력해야 합니다.' })
  content: string;

  @IsNotEmpty({ message: '작성자 이름을 입력해야 합니다.' })
  author: string;
}
