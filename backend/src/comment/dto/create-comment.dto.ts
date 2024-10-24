import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '댓글 내용' }) // Swagger 설명 추가
  @IsNotEmpty({ message: '댓글 내용을 입력해야 합니다.' })
  content: string;

  @ApiProperty({ description: '작성자 이름 (회원가입 기능 구현 후 수정예정)' }) // Swagger 설명 추가
  @IsNotEmpty({ message: '작성자 이름을 입력해야 합니다.' })
  author: string;
}
