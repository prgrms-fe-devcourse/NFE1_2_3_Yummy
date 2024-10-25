import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; // DTO를 import
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { User } from '../users/schemas/user.schema';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService, // UsersService 추가
  ) {}

  // 로그인 엔드포인트
  @Post('login')
  @ApiOperation({ summary: '로그인' }) // Swagger에 로그인 엔드포인트 설명 추가
  async login(@Body() loginUserDto: LoginUserDto) {
    // DTO 사용
    const { email, password } = loginUserDto; // DTO로 받은 데이터 구조분해 할당
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // 더 명확한 오류 메시지
    }

    return this.authService.login(user);
  }

  // 회원가입 엔드포인트
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, password, nickname } = createUserDto;
    return this.usersService.create(email, password, nickname); // UsersService를 통해 회원가입 처리
  }
}
