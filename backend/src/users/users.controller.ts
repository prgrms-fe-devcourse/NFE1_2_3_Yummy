import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto'; // DTO를 import
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @Post('register')
  //   @ApiOperation({ summary: '회원가입' }) // Swagger 설명 추가
  //   async register(@Body() createUserDto: CreateUserDto): Promise<User> {
  //     const { email, password, nickname } = createUserDto; // DTO로 받은 데이터 구조분해 할당
  //     return this.usersService.create(email, password, nickname);
  //   }
}
