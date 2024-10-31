import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 기본 전략 설정,
    UsersModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // 비밀 키를 안전하게 보관하세요
      signOptions: { expiresIn: null }, // 토큰 만료 시간
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
