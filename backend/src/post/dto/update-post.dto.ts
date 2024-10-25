import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger 데코레이터 임포트

export class UpdatePostDto {
  @ApiProperty({ description: '게시글 제목', example: '수정된 제목 예시' }) // Swagger에 설명과 예시 추가
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용', example: '수정된 내용 예시' }) // Swagger에 설명과 예시 추가
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: '게시글 카테고리',
    example: '일상',
    required: false,
  }) // Swagger에 설명과 예시 추가
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: '게시글 이미지 URL',
    example: 'http://example.com/image.jpg',
    required: false,
  }) // Swagger에 설명과 예시 추가
  @IsOptional()
  @IsString()
  image_url?: string; // 이미지 URL 추가
}
