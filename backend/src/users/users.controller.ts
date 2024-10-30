import {
  Controller,
  Body,
  UseGuards,
  Put,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './schemas/user.schema';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:userId')
  @ApiOperation({ summary: '사용자 ID로 사용자 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '사용자 정보가 성공적으로 조회되었습니다.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('userId') userId: string): Promise<User> {
    return this.userService.findById(userId);
  }

  @Put('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '사용자 프로필 정보 수정' })
  @ApiResponse({
    status: 200,
    description: '프로필이 성공적으로 수정되었습니다.',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: UpdateProfileDto, description: '수정할 프로필 정보' })
  async updateProfile(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user._id;
    console.log('User ID from JWT:', userId);

    return this.userService.updateProfile(userId, updateProfileDto);
  }
}
