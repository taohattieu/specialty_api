import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/profile-update.dto';
import { apiVersion } from 'src/constants/version';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { JwtClaimDto } from 'src/common/jwt-claim.dto';

@Controller({ path: 'profile', version: apiVersion })
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly _profileService: ProfileService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Lấy thông tin người dùng hiện tại',
    type: ProfileDto,
  })
  @ApiOperation({ summary: 'Lấy thông tin user đăng nhập' })
  getCurrentUser(@AuthUser() authUser: JwtClaimDto) {
    return this._profileService.getCurrentUser(authUser);
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Cập nhật thông tin người dùng hiện tại',
    type: ProfileDto,
  })
  @ApiOperation({ summary: 'Cập nhật thông tin user đăng nhập' })
  update(
    @AuthUser() authUser: JwtClaimDto,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this._profileService.update(authUser, updateProfileDto);
  }
}
