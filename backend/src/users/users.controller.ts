import { Controller, Post, Body, UseGuards, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('/profile')
  @ApiOperation({ summary: '사용자 프로필 정보 수정' })
  @ApiResponse({
    status: 200,
    description: '프로필이 성공적으로 수정되었습니다.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: UpdateProfileDto, description: '수정할 프로필 정보' })
  async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.user._id;
    console.log(userId);

    return this.userService.updateProfile(userId, updateProfileDto);
  }
}
