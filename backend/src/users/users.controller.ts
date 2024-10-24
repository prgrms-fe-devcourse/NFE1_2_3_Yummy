import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'; // UnauthorizedException 추가
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.create(email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.findOne(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    // JWT 토큰 생성 로직을 여기에 추가할 것입니다.
    return { message: '로그인 성공' }; // 일단 임시로 성공 메시지 반환
  }
}
