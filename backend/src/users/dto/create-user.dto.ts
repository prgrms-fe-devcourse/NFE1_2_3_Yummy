import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'nickname123', description: '닉네임' })
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
