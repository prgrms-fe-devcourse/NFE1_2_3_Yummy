import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ description: '프로필 이미지 URL', required: false })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({ description: '사용자 닉네임', required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ description: '사용자 소개글', required: false })
  @IsOptional()
  @IsString()
  bio?: string;
}
